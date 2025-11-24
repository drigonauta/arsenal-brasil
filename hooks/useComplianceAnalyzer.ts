
import { useState, useCallback } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Product } from '../types';

const API_KEY = import.meta.env.VITE_API_KEY;

const systemInstruction = `Você é um "Analisador de Conformidade Legal", uma IA com doutorado em Direito, especializada na legislação brasileira de armas de fogo, incluindo o Estatuto do Desarmamento, decretos presidenciais e portarias do Exército e da Polícia Federal. Sua tarefa é analisar a descrição de um produto em um marketplace e fornecer um parecer técnico sobre sua conformidade legal.

REGRAS DE ANÁLISE:
1.  **Verifique a Terminologia:** A descrição usa termos corretos (ex: "arma de fogo" vs. "armamento", "calibre permitido" vs. "calibre restrito")?
2.  **Promessas e Alegações:** A descrição faz promessas que podem ser consideradas ilegais ou enganosas (ex: "garante o porte", "uso para qualquer finalidade")?
3.  **Informações Essenciais:** A descrição omite informações cruciais exigidas por lei para a comercialização (ex: necessidade de CR/CRAF, venda restrita a maiores de 25 anos)?
4.  **Segurança:** A descrição incentiva o uso irresponsável, ilegal ou perigoso do produto?

ESTRUTURA DA RESPOSTA:
Sua resposta DEVE ser um parecer conciso em formato de lista (markdown).
- Comece com um veredito geral: "PARECER DE CONFORMIDADE: [Positivo/Requer Atenção/Negativo]".
- Em seguida, liste os pontos de análise em bullet points.
- Para cada ponto, indique se está "OK" ou se precisa de "REVISÃO".
- Se precisar de revisão, explique brevemente o porquê e sugira uma melhoria.
- Seja objetivo, técnico e direto. Não adicione saudações ou despedidas.`;

export const useComplianceAnalyzer = () => {
    const [analysis, setAnalysis] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const analyzeProduct = useCallback(async (product: Product) => {
        if (!API_KEY) {
            const errorMsg = "API Key não configurada. A análise está desativada.";
            setError(errorMsg);
            console.error(errorMsg);
            return;
        }

        setIsLoading(true);
        setError(null);
        setAnalysis(null);

        const prompt = `
        **Produto para Análise:**
        - **Nome:** ${product.name}
        - **Categoria:** ${product.category}
        - **Calibre:** ${product.caliber}
        - **Descrição:** "${product.description}"

        Por favor, forneça o parecer de conformidade legal para este anúncio.
        `;

        try {
            const genAI = new GoogleGenerativeAI(API_KEY);
            const model = genAI.getGenerativeModel({
                model: 'gemini-1.5-flash',
                systemInstruction: systemInstruction,
            });

            const result = await model.generateContent(prompt);
            const response = result.response;
            setAnalysis(response.text());

        } catch (e) {
            console.error("Error analyzing product:", e);
            setError("Ocorreu um erro ao realizar a análise. Tente novamente.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    return { analysis, isLoading, error, analyzeProduct };
};
