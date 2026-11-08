import express from 'express';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT || 3000);

app.use(express.json());

// API route for generating real-time romantic whispers for Bayyan
app.post('/api/whisper', async (req, res) => {
  try {
    const { category, prompt } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(200).json({
        title: 'You Are My Forever Sanctuary, Bayyan',
        body: 'Bayyan, loving you is the easiest and most magical journey of my life. Every rose that falls reminds me of the countless reasons why my soul chose yours.',
        arabicSnippet: 'أنتِ أمنيتي التي تحققت وأجمل هدايا العمر يا بيان.',
        moodTag: 'Everlasting Devotion'
      });
    }

    const ai = new GoogleGenAI({ apiKey });

    const categoryDescriptions: Record<string, string> = {
      love_messages: 'deep, tender, heartfelt romantic love message declaring eternal devotion, safety, and affection for his love Bayyan',
      deep_romance: 'poetic, soulmate-level, emotionally profound romantic message about destiny, stars, two souls becoming one, dedicated to Bayyan',
      hot_feelings: 'passionate, alluring, sensual, romantic fire and irresistible chemistry, longing kisses, butterflies, written for his love Bayyan',
      romance_jokes: 'witty, super cute, flirty, hilarious, charming romantic joke or adorable pickup line that will make Bayyan giggle and blush'
    };

    const targetDesc = categoryDescriptions[category] || 'sweet heartfelt romantic love letter for Bayyan';

    const systemPrompt = `You are a deeply devoted lover writing a romantic note exclusively for your beloved woman named "Bayyan" (بيان).
Tone: ${targetDesc}.
Always refer to her affectionately by her name "Bayyan".
Output MUST be a valid JSON object with the following fields:
- "title": A short poetic title (e.g. "The Light In Your Eyes, Bayyan" or "My Sweet Weakness, Bayyan")
- "body": 2-3 romantic sentences specifically mentioning Bayyan, rich in feeling and imagery (falling pink roses, warmth, devotion).
- "arabicSnippet": A short, authentic romantic line in poetic Arabic expressing love for Bayyan (بيان).
- "moodTag": A 2-word romantic mood label (e.g. "Pure Passion", "Sweet Surrender", "Heartbeat Echo").
Return strictly raw JSON without markdown code fences.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
          role: 'user',
          parts: [{ text: prompt ? `${systemPrompt}\nUser custom wish: ${prompt}` : systemPrompt }]
        }
      ],
      config: {
        responseMimeType: 'application/json'
      }
    });

    const text = response.text || '{}';
    const parsed = JSON.parse(text);
    return res.json(parsed);
  } catch (error) {
    console.error('Error generating romantic whisper:', error);
    return res.status(200).json({
      title: 'Forever Enchanted by Bayyan',
      body: 'Every breath, every beat of my heart sings your name, Bayyan. You are my greatest joy and sweetest blessing.',
      arabicSnippet: 'أحبكِ فوق كل الكلمات والمسافات يا بيان.',
      moodTag: 'Timeless Devotion'
    });
  }
});

// Mount Vite or serve static assets
if (process.env.NODE_ENV !== 'production') {
  const { createServer: createViteServer } = await import('vite');
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);
} else {
  app.use(express.static(path.join(__dirname, 'dist')));
  app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Romantic Sanctuary for Bayyan running on http://0.0.0.0:${PORT}`);
});
