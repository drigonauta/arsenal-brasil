
import { useState, useCallback } from 'react';
import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_API_KEY;

const systemInstruction = `Você é um sistema de verificação de documentos (OCR) para o ARSENAL BRASIL, especializado em analisar Certificados de Registro (CR) de CACs. Sua tarefa é analisar os dados de um CR e retornar um status de verificação em JSON.

1.  **Analise os Dados:** Verifique o número do CR e a data de validade.
2.  **Simule a Análise do Documento:** A "imagem" do documento será simulada. Assuma que você pode ler o documento.
3.  **Valide as Informações:**
    *   O número do CR deve ter um formato numérico plausível (ex: 1 a 12 dígitos).
    *   A data de validade não pode estar no passado.
    *   O nome no documento (simulado como 'Rodrigo Ribeiro') deve ser consistente.
4.  **Retorne o Status:** Responda com um status 'Verificado' se tudo estiver correto, ou 'Rejeitado' se houver inconsistências, explicando o motivo.

Responda APENAS com o objeto JSON.`;

const responseSchema = {
    type: SchemaType.OBJECT,
    properties: {
        status: {
            type: SchemaType.STRING,
            description: "O status da verificação.",
            enum: ['Verificado', 'Rejeitado', 'Em Análise']
        },
        reason: {
            type: SchemaType.STRING,
            description: "O motivo para o status, especialmente em caso de rejeição."
        }
    },
    required: ['status', 'reason']
};

export const useCrVerifier = () => {
    const [verificationResult, setVerificationResult] = useState<{ status: string; reason: string } | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const verifyCr = useCallback(async (crNumber: string, expiryDate: string, file: File) => {
        if (!API_KEY) {
            const errorMsg = "API Key não configurada. A verificação de IA está desativada.";
            setError(errorMsg);
            console.error(errorMsg);
            return null;
        }

        setIsLoading(true);
        setError(null);
        setVerificationResult(null);

        const prompt = `
        Por favor, verifique o seguinte Certificado de Registro (CR):
        - **Número do CR:** ${crNumber}
        - **Data de Validade:** ${expiryDate}
        - **Nome do Arquivo:** ${file.name}
        - **Tipo do Arquivo:** ${file.type}
        - **Nome no Documento (simulado):** Rodrigo Ribeiro
        `;

        try {
            // Simulate a delay for a more realistic UX
            await new Promise(resolve => setTimeout(resolve, 2000));

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
            setVerificationResult(parsedJson);
            return parsedJson;

        } catch (e) {
            console.error("Error verifying CR document:", e);
            setError("Ocorreu um erro ao processar a verificação. Tente novamente.");
            return null;
        } finally {
            setIsLoading(false);
        }
    }, []);

    return { verificationResult, isLoading, error, verifyCr };
};
