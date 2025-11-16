/**
 * highlightImportant(): heuristically highlights long paragraphs
 */
export async function highlightImportant() {
  try {
    const paragraphs = Array.from(document.querySelectorAll("p"));
    let count = 0;
    paragraphs.forEach(p => {
      if (p.innerText && p.innerText.length > 80) {
        p.style.backgroundColor = "rgba(255,246,128,0.9)";
        p.style.padding = "6px";
        p.style.borderRadius = "6px";
        count++;
      }
    });
    return `✨ Highlighted ${count} paragraphs on the page.`;
  } catch (err) {
    console.error("highlightImportant error", err);
    return "Error: couldn't highlight the page.";
  }
}
