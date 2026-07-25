
export function Description(text, maxLength = 100) {
  if (!text) return "";
  if (text.length <= maxLength) return text;

  const truncated = text.slice(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(" ");

  const safeTruncated =
    lastSpaceIndex > 0 ? truncated.slice(0, lastSpaceIndex) : truncated;

  return `${safeTruncated.trim()}…`;
}
