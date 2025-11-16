import { summarizePage } from "./tool_summarize.js";
import { translateText } from "./tool_translate.js";
import { highlightImportant } from "./tool_highlight.js";
import { switchTheme } from "./tool_theme.js";
import { readText } from "./tool_speech.js";

/**
 * runTools(userText, context)
 * - userText: typed command
 * - context: optional helpers like { setTheme }
 *
 * Returns:
 * - string reply (assistant message) if a tool handled it
 * - null if no tool matched (so normal AI flow should be used)
 */
export async function runTools(userText, context = {}) {
  const t = userText.toLowerCase().trim();

  // Summarize page
  if (t.startsWith("summarize") && t.includes("page")) {
    return await summarizePage();
  }
  if (t === "summarize this page" || t === "summarize page") {
    return await summarizePage();
  }

  // Highlight
  if (t.includes("highlight")) {
    return await highlightImportant();
  }

  // Theme switching
  if (t.includes("dark mode") || t.includes("switch to dark")) {
    if (context.setTheme) context.setTheme("dark");
    return "🌙 Switched to Dark Mode";
  }
  if (t.includes("light mode") || t.includes("switch to light")) {
    if (context.setTheme) context.setTheme("light");
    return "☀️ Switched to Light Mode";
  }
  if (t.includes("sepia")) {
    if (context.setTheme) context.setTheme("sepia");
    return "📜 Switched to Sepia Mode";
  }

  // Translate
  if (t.startsWith("translate")) {
    return await translateText(userText);
  }

  // Read aloud
  if (t.startsWith("read this") || t.startsWith("read:") || t.startsWith("read")) {
    return await readText(userText);
  }

  // fallback: no tool matched
  return null;
}
