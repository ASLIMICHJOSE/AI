/**
 * switchTheme is handled in toolController via context.setTheme
 * keep a helper if needed standalone
 */
export function switchTheme(text) {
  if (text.includes("dark")) return "dark";
  if (text.includes("sepia")) return "sepia";
  return "light";
}
