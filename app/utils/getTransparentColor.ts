/**
 * Returns a transparent version of the given color.
 *
 * @param color - The base color in hex format. It should be a 7 characters long hex code starting with #.
 * @param opacity - The opacity level ranging from 0 (fully transparent) to 1 (fully opaque).
 * @returns The color with the specified opacity.
 */
export const getTransparentColor = (color: string, opacity: number) => {
  if (!/^#[0-9A-F]{6}$/i.test(color)) {
    throw new Error("Invalid hex color format");
  }

  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};
