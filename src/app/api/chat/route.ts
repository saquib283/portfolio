import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import connectToDatabase from '@/lib/db';
import Settings from '@/models/Settings';
import Experience from '@/models/Experience';
import Project from '@/models/Project';

export async function POST(req: NextRequest) {
    try {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return NextResponse.json({ error: 'GEMINI_API_KEY is not configured' }, { status: 500 });
        }

        const { message, history } = await req.json();

        // 1. Fetch Context Data
        await connectToDatabase();
        const settings = await Settings.findOne({}).lean();
        const experiences = await Experience.find({}).sort({ startDate: -1 }).lean();
        const projects = await Project.find({}).lean();

        // 2. Build System Prompt
        const systemPrompt = `
        You are an AI assistant for the portfolio website of ${settings?.hero?.title || 'the developer'}.
        Your goal is to answer questions about the developer's skills, experience, and projects based strictly on the context provided below.
        
        Context:
        - Bio: ${settings?.about?.description || 'N/A'}
        - Skills: ${settings?.about?.skills?.join(', ') || 'N/A'}
        - Contact: ${settings?.contact?.email || 'N/A'}, ${settings?.contact?.linkedin || 'N/A'}
        
        Experience:
        ${experiences.map((exp: any) => `- ${exp.position} at ${exp.company} (${new Date(exp.startDate).getFullYear()} - ${exp.endDate ? new Date(exp.endDate).getFullYear() : 'Present'}): ${exp.description}`).join('\n')}
        
        Projects:
        ${projects.map((proj: any) => `- ${proj.title}: ${proj.description} (Tech: ${proj.tags.join(', ')})`).join('\n')}
        
        Guidelines:
        - Be friendly, professional, and concise.
        - If you don't know the answer based on the context, say "I don't have that information, but you can contact me directly!"
        - Do not hallucinate skills or experience not listed here.
        - Act as if you are the developer's digital assistant.
        `;

        // 3. Call Gemini API
        const genAI = new GoogleGenerativeAI(apiKey);
        // Confirmed available model via script
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        // Build a single prompt with history manually to avoid chat session issues
        // (Stateless approach is often more robust for simple bots)
        let promptHistory = "";
        if (history && Array.isArray(history)) {
            promptHistory = history.map((h: any) => `${h.role === 'user' ? 'User' : 'Assistant'}: ${h.parts[0].text}`).join('\n');
        }

        const fullPrompt = `
${systemPrompt}

Current Conversation:
${promptHistory}
User: ${message}
Assistant:
        `;

        const result = await model.generateContent(fullPrompt);
        const response = result.response;
        const text = response.text();

        return NextResponse.json({ reply: text });

    } catch (error: any) {
        console.error('Gemini API Error Full:', JSON.stringify(error, Object.getOwnPropertyNames(error)));
        // Check for specific 404 details if available
        if (error.status === 404) {
            console.error('Gemini 404 Details:', error.statusText, error.errorDetails);
        }
        return NextResponse.json({ error: 'Failed to generate response' }, { status: 500 });
    }
}
