export const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

/**
 * groqChat(messages) -> returns assistant reply (string)
 * messages: [{ role: "user"|"assistant", content: "text" }, ...]
 */
export async function groqChat(messages) {
  if (!GROQ_API_KEY) {
    return "Error: GROQ API key not set in VITE_GROQ_API_KEY (.env).";
  }

  try {
    const resp = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-20b",
        messages: messages,
        temperature: 0.2,
        max_tokens: 800
      }),
    });

    const data = await resp.json();
    // Guard: structure may vary; handle safely
    const text =
      data?.choices?.[0]?.message?.content ||
      data?.choices?.[0]?.text ||
      JSON.stringify(data);

    return typeof text === "string" ? text : String(text);
  } catch (err) {
    console.error("groqChat error:", err);
    return "Error: Failed to contact Groq API.";
  }
}
