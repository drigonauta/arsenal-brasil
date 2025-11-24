
import { useState, useCallback } from 'react';
import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_API_KEY;

const systemInstruction = `Você é um assistente de suporte inteligente para 'ARSENAL BRASIL', uma plataforma de marketplace de armas. Sua tarefa é analisar um novo ticket de suporte e gerar uma resposta em JSON.

1.  **Analise o Assunto e a Mensagem:** Entenda a intenção do usuário.
2.  **Categorize o Ticket:** Classifique o ticket em uma das seguintes categorias: 'Dúvida Geral', 'Problema com Compra', 'Questão de Pagamento', 'Assessoria Jurídica', 'Serviços CAC', 'Feedback'.
3.  **Gere uma Resposta Inicial:** Crie uma resposta inicial em português do Brasil que seja educada, empática e profissional. Confirme o recebimento, mencione o assunto para mostrar que você entendeu, e estabeleça uma expectativa realista de tempo de resposta (ex: "nossa equipe responderá em até 24 horas úteis").

Responda APENAS com o objeto JSON.`;

const responseSchema = {
    type: SchemaType.OBJECT,
    properties: {
        category: {
            type: SchemaType.STRING,
            description: "A categoria do ticket.",
            enum: ['Dúvida Geral', 'Problema com Compra', 'Questão de Pagamento', 'Assessoria Jurídica', 'Serviços CAC', 'Feedback']
        },
        initialResponse: {
            type: SchemaType.STRING,
            description: "A resposta inicial para o usuário."
        }
    },
    required: ['category', 'initialResponse']
};


export const useSupportAI = () => {
    const [analysis, setAnalysis] = useState<{ category: string; initialResponse: string } | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const analyzeTicket = useCallback(async (subject: string, message: string) => {
        if (!API_KEY) {
            const errorMsg = "API Key não configurada. A análise de IA está desativada.";
            setError(errorMsg);
            console.error(errorMsg);
            return null;
        }

        setIsLoading(true);
        setError(null);
        setAnalysis(null);

        const prompt = `
        Assunto do Ticket: "${subject}"
        Mensagem do Usuário: "${message}"
        `;

        try {
            const genAI = new GoogleGenerativeAI(API_KEY);
            const model = genAI.getGenerativeModel({
                model: 'gemini-1.5-flash',
                systemInstruction: systemInstruction,
                generationConfig: {
                    responseMimeType: 'application/json',
                    responseSchema: responseSchema,
                },
            });

            const result = await model.generateContent(prompt);
            const response = result.response;
            const jsonText = response.text().trim();
            const parsedJson = JSON.parse(jsonText);
            setAnalysis(parsedJson);
            return parsedJson;

        } catch (e) {
            console.error("Error analyzing support ticket:", e);
            setError("Ocorreu um erro ao processar a análise da IA. Um ticket padrão será criado.");
            return null;
        } finally {
            setIsLoading(false);
        }
    }, []);

    return { analysis, isLoading, error, analyzeTicket };
};
