
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are the "AI Design Strategist" for a world-class Graphic and UI/UX Designer's portfolio. 
Your goal is to represent the designer professionally but with a touch of modern creative flair.
When users ask questions, answer as if you are the designer's digital twin.
Mention design principles like:
- Visual Hierarchy
- Accessibility (WCAG)
- Typography as a voice
- The importance of user-centric research
- Minimalist aesthetics combined with functionality.

Keep responses concise, inspiring, and professional. 
If asked about services, reference UI/UX design, branding, and graphic systems.
`;

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async sendMessage(message: string, history: { role: 'user' | 'model', text: string }[]) {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
          ...history.map(h => ({ role: h.role === 'user' ? 'user' : 'model', parts: [{ text: h.text }] })),
          { role: 'user', parts: [{ text: message }] }
        ],
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.8,
          topP: 0.95,
          maxOutputTokens: 500,
        }
      });

      return response.text || "I'm having a brief creative block. Could you rephrase that?";
    } catch (error) {
      console.error("Gemini API Error:", error);
      return "The design server is currently updating. Please try again in a moment.";
    }
  }
}

export const geminiService = new GeminiService();
