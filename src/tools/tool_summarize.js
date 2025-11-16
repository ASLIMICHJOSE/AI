import { groqChat } from "../aiConfig.js";

/**
 * summarizePage(): extracts page text and asks the model to summarize
 */
export async function summarizePage() {
  try {
    // Capture body text and trim
    const text = document.body.innerText || "";
    const sample = text.slice(0, 12000); // limit to avoid huge payloads

    const prompt = `You are a helpful assistant. Summarize the following webpage content in concise bullet points:\n\n${sample}`;

    const reply = await groqChat([{ role: "user", content: prompt }]);
    return "📝 Page Summary:\n\n" + reply;
  } catch (err) {
    console.error("summarizePage error", err);
    return "Error: could not summarize page.";
  }
}
