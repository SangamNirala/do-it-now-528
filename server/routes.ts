import type { Express } from "express";
import { createServer, type Server } from "http";
import path from "path";
import fs from "fs";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get("/api/resume", (req, res) => {
    const resumePath = path.join(process.cwd(), "attached_assets", "Sangam Nirala2_1764390677895.pdf");
    
    if (fs.existsSync(resumePath)) {
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", 'attachment; filename="Sangam_Nirala_Resume.pdf"');
      fs.createReadStream(resumePath).pipe(res);
    } else {
      res.status(404).json({ error: "Resume not found" });
    }
  });

  app.post("/api/ai-chat", async (req, res) => {
    try {
      const { question, context } = req.body;

      if (!question || !context) {
        return res.status(400).json({ error: "Missing question or context" });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: "API key not configured" });
      }

      const prompt = `You are an AI assistant helping visitors learn about Sangam Nirala, an ML Engineer. 
Use the following information about Sangam to answer the user's question accurately and concisely.

SANGAM'S INFORMATION:
${context}

USER QUESTION: ${question}

Please provide a helpful, accurate answer based on the information provided above. Keep your response concise and relevant.`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/text-bison-001:generateText?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: {
              text: prompt,
            },
            temperature: 0.7,
            candidateCount: 1,
          }),
        }
      );

      if (!response.ok) {
        const error = await response.text();
        console.error("Gemini API error:", error);
        
        // Fallback: If API key doesn't work, provide a helpful response based on context
        const contextMatch = context.match(/(?:EXPERIENCE|PROJECTS|SKILLS|EDUCATION)([\s\S]*?)(?=\n[A-Z]+:|$)/g);
        const answer = `I'm having trouble connecting to the AI service right now. However, based on Sangam's portfolio: Sangam is an ML Engineer with experience at Zenbourg and Sakura Biotech, specializing in computer vision (Face Detection System with 96.5% accuracy) and RAG-based AI systems (PDF Chatbot with 92.4% accuracy). He's proficient in Python, TensorFlow, PyTorch, and has skills in MLOps, Docker, and cloud deployment. Feel free to ask more specific questions!`;
        return res.json({ answer });
      }

      const data = await response.json();
      const answer =
        data.candidates?.[0]?.output ||
        "Sorry, I couldn't generate a response. Please try again.";

      res.json({ answer });
    } catch (error) {
      console.error("AI chat error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  return httpServer;
}
