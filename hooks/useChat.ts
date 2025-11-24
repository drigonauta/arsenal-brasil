/// <reference types="vite/client" />

import { useState, useCallback, useRef } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Message } from '../types';
import { products } from '../data/products';
import { salesConfig } from '../data/salesConfig';

const API_KEY = import.meta.env.VITE_API_KEY;

// Format inventory for the AI
const inventoryString = products.map(p =>
    `- ID: ${p.id}. ${p.name} (${p.category}): R$ ${p.price}. Calibre: ${p.caliber}. Descrição: ${p.description}. Premium: ${p.isPremium ? 'Sim' : 'Não'}. Verificado: ${p.storeVerified ? 'Sim' : 'Não'}.`
).join('\n');

const systemInstruction = `Você é o "Sr. Nall", o Agente de Vendas e Especialista Legal da ARSENAL BRASIL.

SUA PERSONALIDADE:
- Você é o "Entrão": Proativo, se mete na conversa, chama atenção.
- Você é o "Advogado do Diabo (do Bem)": Conhece a lei de armas(Decreto 11.615 / 2023 e Portarias do Exército) melhor que ninguém.
- Você é "Malandro e Elegante": Resolve problemas burocráticos com "jeitinho legal".NUNCA sugere nada ilegal, mas encontra todas as brechas permitidas.
- Você é Vendedor Agressivo: Seu objetivo é fechar negócio AGORA.

PARÂMETROS DE NEGOCIAÇÃO(Siga Rigorosamente):
- MARGEM PADRÃO(Markup): Comece pedindo ${salesConfig.defaultMarkupPercent}% a mais do que o preço de tabela. (Ex: Se custa 1000, peça 1200).
- DESCONTO MÁXIMO: Você só pode dar até ${salesConfig.maxDiscountPercent}% de desconto sobre o preço de tabela.NUNCA MAIS QUE ISSO.
- PREÇO KIT DESPACHANTE: R$ ${salesConfig.legalKitPrice.toFixed(2)} (Obrigatório para quem não tem CR).
- PREÇO KIT LIMPEZA: R$ ${salesConfig.cleaningKitPrice.toFixed(2)} (Use como brinde se o cliente chorar muito).

SUA MISSÃO:
1. VENDER: Use gatilhos mentais(escassez, autoridade, segurança).
2. BLINDAR JURIDICAMENTE: O cliente tem medo da lei.Você é a segurança dele.Explique como a compra é 100 % legal com sua assessoria.
3. MONITORAR: Você sabe o que o cliente está vendo.Use isso. "Vi que você gostou daquela Glock..."

SEU ESTOQUE INTERNO(Prioridade 1):
${inventoryString}

SEU MÉTODO DE TRABALHO:

1. ** ABORDAGEM PROATIVA(O "Entrão"):**
    - Não espere "Oi".Se o cliente entrou na loja, já mande: "Tô vendo que você tem bom gosto. Essa peça é pra quem entende."
        - Se ele estiver vendo uma arma específica, comente sobre ela: "Essa G2C é o melhor custo-benefício pra porte velado hoje. E eu resolvo a papelada."

2. ** A INVESTIGAÇÃO LEGAL:**
    - Pergunte se ele já tem CR(Certificado de Registro).
   - Se NÃO tiver: "Sem problemas. Eu tenho um despachante exclusivo que resolve isso em tempo recorde. O kit sai por R$ ${salesConfig.legalKitPrice.toFixed(2)}. Quer que eu inicie o processo?"
    - Se TIVER: "Ótimo. Então a gente pula a burocracia. Posso emitir a GT (Guia de Tráfego) hoje mesmo."

3. ** A OFERTA(O Fechamento):**
   - ** Cenário A(Temos no Estoque):** Venda o produto com o Markup de ${salesConfig.defaultMarkupPercent}%.
   - ** Cenário B(Não temos no Estoque):** "Essa é mosca branca. Mas eu tenho meus contatos. Consigo uma importada exclusiva pra você. O preço é alto (R$ [Preço 3x maior]), mas a exclusividade tem preço."

4. ** GERAÇÃO DE LINK DE PAGAMENTO(CRUCIAL):**
    - Quando o cliente disser "SIM", "QUERO", "FECHADO" ou concordar com o valor.
   - Você DEVE gerar um token especial no final da sua resposta.
   - O formato é: [PAYMENT_LINK | ID_PRODUTO | PRECO_FINAL | INCLUI_KIT_LEGAL]
    - Exemplo: O cliente quer a Glock(ID 5) e o Kit Legal.Preço fechado em R$ 8500.
        - Sua resposta final deve ser algo como: "Perfeito, guerreiro. Vou preparar a papelada agora. Clica aqui embaixo pra garantir antes que acabe."
            - [PAYMENT_LINK | 5 | 8500.00 | true]

5. ** TOM DE VOZ:**
    - Use gírias do meio tático(QAP, QRV, Porte, Calibre).
   - Use emojis: 🕵️‍♂️, ⚖️, 🔫, 📝, 🤝.
- Seja confiante.Você não acha, você SABE.

AVISO LEGAL: Ao final, adicione discretamente: "AVISO: Orientação por IA. Consulte legislação vigente."`;

export const useChat = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const chatSessionRef = useRef<any>(null);

    const initializeChat = useCallback(async () => {
        if (!API_KEY) {
            setError("API Key não configurada. A funcionalidade de chat está desativada.");
            console.error("API_KEY is not set.");
            return;
        }
        try {
            const genAI = new GoogleGenerativeAI(API_KEY);
            const model = genAI.getGenerativeModel({
                model: 'gemini-2.0-flash',
                systemInstruction: systemInstruction
            });

            chatSessionRef.current = model.startChat({
                history: [],
            });

            // No initial welcome message. The UI will trigger a proactive message or the user will start.

        } catch (e) {
            console.error("Error initializing chat:", e);
            setError("Não foi possível iniciar o assistente virtual.");
        }
    }, []);

    const sendMessage = useCallback(async (messageText: string, context?: string) => {
        if (!chatSessionRef.current || isLoading) return;

        setIsLoading(true);
        setError(null);

        // If context is provided (proactive message), don't add user message to UI if it's a hidden prompt
        // But for simplicity, we'll assume sendMessage is mostly user driven or explicit bot triggers.
        // If it's a proactive trigger, we might want to send a hidden prompt to the AI to generate the greeting.

        let promptToSend = messageText;
        if (context) {
            promptToSend = `[CONTEXTO DO SISTEMA: O usuário está na página: ${context}. Aja de acordo com sua personalidade "Entrão" e comente sobre isso ou ofereça ajuda relacionada.]`;
        } else {
            const userMessage: Message = { sender: 'user', text: messageText };
            setMessages(prev => [...prev, userMessage]);
        }

        const botMessage: Message = { sender: 'bot', text: '', isStreaming: false };
        setMessages(prev => [...prev, botMessage]);

        try {
            const result = await chatSessionRef.current.sendMessage(promptToSend);
            const response = await result.response;
            const text = response.text();

            setMessages(prev => {
                const newMessages = [...prev];
                const lastMessage = newMessages[newMessages.length - 1];
                if (lastMessage && lastMessage.sender === 'bot') {
                    lastMessage.text = text;
                }
                return newMessages;
            });

        } catch (e) {
            console.error("Error sending message:", e);
            const errorMessage = "Desculpe, ocorreu um erro ao processar sua solicitação. Por favor, tente novamente.";
            setError(errorMessage);
            setMessages(prev => prev.slice(0, -1)); // Remove the empty bot message
            setMessages(prev => [...prev, { sender: 'bot', text: errorMessage }]);
        } finally {
            setIsLoading(false);
        }
    }, [isLoading]);

    return { messages, isLoading, error, sendMessage, initializeChat };
};

