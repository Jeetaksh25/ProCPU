export const hexToRgba = (hex, alpha) => {
  if (!hex || typeof hex !== "string") return `rgba(0,0,0,${alpha})`;

  const sanitized = hex.replace("#", "");

  if (sanitized.length !== 6) return `rgba(0,0,0,${alpha})`;

  const r = parseInt(sanitized.slice(0, 2), 16);
  const g = parseInt(sanitized.slice(2, 4), 16);
  const b = parseInt(sanitized.slice(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};