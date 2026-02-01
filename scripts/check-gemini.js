const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config({ path: '.env' });

async function listModels() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.error("No API KEY found in .env");
        return;
    }

    // Clean the key just in case
    const cleanKey = apiKey.trim().replace(/^["']|["']$/g, '');
    console.log("Using Key (first 5 chars):", cleanKey.substring(0, 5) + "...");

    const genAI = new GoogleGenerativeAI(cleanKey);

    try {
        // There isn't a direct "listModels" on the instance in the SDK usually exposed simply,
        // but we can try to make a request or just try a basic model.
        // Actually, the SDK supports ModelService? 
        // Let's just try to hit the API endpoint directly using fetch to be sure.

        console.log("Fetching models via REST API...");
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${cleanKey}`);
        const data = await response.json();

        if (data.models) {
            console.log("\nAvailable Models:");
            data.models.forEach(m => {
                if (m.supportedGenerationMethods.includes('generateContent')) {
                    console.log(`- ${m.name}`);
                }
            });
        } else {
            console.log("No models found or error:", JSON.stringify(data, null, 2));
        }

    } catch (error) {
        console.error("Error listing models:", error);
    }
}

listModels();
