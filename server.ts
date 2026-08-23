import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes FIRST
  app.post("/api/chat", async (req, res) => {
    try {
      const ai = new GoogleGenAI({ 
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });
      
      const { message } = req.body;
      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: message,
        config: {
          systemInstruction: "You are an AI Virtual Assistant for Calculus World, powered by Gemini and created by Lucky Luqmanul Hakim (Lukay Project). You are highly intelligent and can answer *anything* the user asks, general knowledge, math, programming, etc., just like a real AI (Gemini/ChatGPT). Be friendly and helpful. Respond in Indonesian. You can also suggest visualizing a calculus topic if they ask for a visual, by starting your response with '[VISUAL: turunan]' or '[VISUAL: integral]' or '[VISUAL: limit]' or '[VISUAL: trigonometri]' or '[VISUAL: aljabar]'. Answer normally without visual tags if they just ask general questions.",
        }
      });

      res.json({ text: response.text });
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      res.status(500).json({ error: "Maaf, terjadi kesalahan saat menghubungi AI. Pastikan API key kamu valid." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
