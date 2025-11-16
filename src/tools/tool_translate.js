import { groqChat } from "../aiConfig.js";

/**
 * translateText("translate <text> to <language>")
 */
export async function translateText(userText) {
  const match = userText.match(/translate\s+(.+)\s+to\s+(.+)/i);
  if (!match) {
    return "❌ Usage: translate <text> to <language>";
  }
  const text = match[1].trim();
  const lang = match[2].trim();

  const prompt = `Translate the following text into ${lang}. Provide the translation only:\n\n${text}`;

  const translated = await groqChat([{ role: "user", content: prompt }]);
  return `🌎 Translation (${lang}):\n\n${translated}`;
}
