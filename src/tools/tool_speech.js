/**
 * readText("read this: ...") -> reads aloud using Web Speech API
 */
export function readText(userText) {
  try {
    const match = userText.match(/read\s*(this[:\s]*)?(.*)/i);
    if (!match || !match[2]) return "❌ Usage: read this <text>";

    const text = match[2].trim();
    if (!("speechSynthesis" in window)) {
      return "Speech Synthesis not supported in this browser.";
    }

    const utter = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utter);
    return "🔊 Reading text aloud!";
  } catch (err) {
    console.error("readText error", err);
    return "Error: could not read text aloud.";
  }
}
