import trim from 'lodash/trim';

function getColorHexCodeWithOpacity(
  colorHexCode: string,
  opacity: number,
): string {
  const normalizedOpacity = Math.round(
    Math.min(Math.max(opacity || 1, 0), 1) * 255,
  );
  const colorHexCodeWithOpacity = `${colorHexCode.slice(
    0,
    7,
  )}${normalizedOpacity.toString(16).toUpperCase()}`;

  return colorHexCodeWithOpacity;
}

function getColorRgbStringWithOpacity(
  colorRgbString: string,
  opacity: number,
): string {
  const openBracketIndex = colorRgbString.indexOf('(');
  const closeBracketIndex = colorRgbString.indexOf(')');
  const rgbValues = colorRgbString
    .slice(openBracketIndex + 1, closeBracketIndex)
    .split(',')
    .slice(0, 3)
    .map((rgbValue) => trim(rgbValue));
  const normalizedOpacity = Math.min(Math.max(opacity || 1, 0), 1);
  const colorRgbStringWithOpacity = `rgba(${rgbValues.join(
    ', ',
  )}, ${normalizedOpacity})`;

  return colorRgbStringWithOpacity;
}

export function getColorStringWithOpacity(
  colorString: string,
  opacity: number,
): string {
  if (colorString.slice(0, 1) === '#') {
    return getColorHexCodeWithOpacity(colorString, opacity);
  }

  if (colorString.slice(0, 3) === 'rgb') {
    return getColorRgbStringWithOpacity(colorString, opacity);
  }

  throw new Error(
    "Invalid color string: Color string must be a valid color hex code starting with '#' of a valid rgb/rgba string",
  );
}
