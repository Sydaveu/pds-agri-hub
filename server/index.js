import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

// MEMORY STORAGE (simple but powerful)
let chatHistory = [];

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  // Save user message
  chatHistory.push({
    role: "user",
    content: userMessage,
  });

  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content:
              "You are a smart agricultural assistant. Help with farming, livestock, and agri business.",
          },
          ...chatHistory,
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const aiReply = response.data.choices[0].message.content;

    // Save AI response
    chatHistory.push({
      role: "assistant",
      content: aiReply,
    });

    res.json({ reply: aiReply });
  } catch (error) {
    console.log(error.response?.data || error.message);
    res.json({ reply: "Error talking to AI" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 AI Server running on http://127.0.0.1:${PORT}`);
});
