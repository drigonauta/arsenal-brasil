
import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';
import path from 'path';

async function listModels() {
    try {
        const envPath = path.resolve(process.cwd(), '.env');
        const envContent = fs.readFileSync(envPath, 'utf-8');
        const match = envContent.match(/VITE_API_KEY=(.*)/);

        if (!match) {
            console.error("Could not find VITE_API_KEY in .env");
            return;
        }

        const apiKey = match[1].trim();
        const genAI = new GoogleGenerativeAI(apiKey);

        console.log("Listing available models...");
        // Note: listModels is on the GoogleGenerativeAI instance or via a specific manager? 
        // Actually, it's usually via a ModelManager or similar, but let's check if we can just try 'gemini-pro' first as it's the most common alias.

        // Let's try to just test 'gemini-pro' directly first, as listModels might need different permissions or SDK usage.
        // But wait, the SDK has a makeRequest or similar? 
        // Actually, let's just try 'gemini-pro'.

        console.log("\nTesting model: gemini-pro");
        try {
            const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
            const result = await model.generateContent("Hello");
            const response = await result.response;
            console.log("Success with gemini-pro! Response:", response.text());
        } catch (e) {
            console.error("Failed with gemini-pro:", e.message);
        }

    } catch (error) {
        console.error("General error:", error);
    }
}

listModels();
