import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash", // or "gemini-2.5-pro" if available
});

/**
 * Send prompt to Gemini and return parsed JSON
 */
export async function askGemini(prompt) {
  const strictPrompt = `
You are a travel planner.
Return ONLY valid JSON with no extra text.

User request: ${prompt}
`;

  const result = await model.generateContent(strictPrompt);
  let text = await result.response.text();

  // Clean the text to make it JSON-parsable
  text = text.trim();

  // Remove extra quotes around JSON
  if (text.startsWith('"') && text.endsWith('"')) {
    text = text.slice(1, -1).replace(/\\"/g, '"');
  }

  // Remove any text before the first { and after the last }
  const firstCurly = text.indexOf('{');
  const lastCurly = text.lastIndexOf('}');
  if (firstCurly !== -1 && lastCurly !== -1) {
    text = text.slice(firstCurly, lastCurly + 1);
  }

  try {
    return JSON.parse(text);
  } catch (err) {
    console.error("⚠️ Invalid JSON from Gemini:", text);
    throw new Error("Gemini did not return valid JSON");
  }
}
