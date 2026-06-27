import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import mongoose from "mongoose";
import Chat from "./models/Chat.js";
import path from "path";

// Try loading .env from current directory, fallback to parent directory
dotenv.config(); 
dotenv.config({ path: path.resolve(process.cwd(), "..", ".env") });

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY, 
});

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.post("/api", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        error: "Please send a valid message",
      });
    }

    const userChat = await Chat.create({
      text: message,
      sender: "user",
    });

    const Response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: message,
    });

    const botChat = await Chat.create({
      text: Response.text,
      sender: "bot",
    });

    res.json({
      success: true,
      reply: Response.text,
    });
  } catch (err) {
    console.error("AI error", err);
    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
});

app.get("/chats", async (req, res) => {
  try {
    const chats = await Chat.find().sort({ createdAt: 1 });
    res.json({
      success: true,
      chats,
    });
  } catch (err) {
    console.error("Error fetching chats:", err);
    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
});

const PORT = process.env.PORT || 5000;

// Validate connection string before connecting to prevent NativeConnection crashes
if (!process.env.MONGO_URI) {
  console.error("ERROR: process.env.MONGO_URI is undefined.");
  console.error("Please ensure your .env file contains: MONGO_URI=your_mongodb_url");
  process.exit(1);
}

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB successfully");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });