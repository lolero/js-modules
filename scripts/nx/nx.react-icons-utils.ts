import {
  appendFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'fs';
import * as path from 'path';

/**
 * Converts a string to PascalCase by splitting on word boundaries (hyphens,
 * underscores, spaces, and case transitions).
 * @param str - Input string e.g. `travel-log`, `segwayIcon`.
 * @returns PascalCase string e.g. `TravelLog`, `SegwayIcon`.
 */
function toPascalCase(str: string): string {
  const words = str.match(/[A-Z]?[a-z]+|[A-Z]+(?=[A-Z]|$)|[0-9]+/g) ?? [];
  return words
    .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
    .join('');
}

/**
 * Derives the React component name and SVG import alias from an icon filename.
 * @param iconFileName - SVG filename including extension e.g.`travel-log.svg`.
 * @returns Icon name, PascalCase component name, and SVG alias.
 */
function getIconNames(iconFileName: string): {
  iconName: string;
  iconComponentName: string;
  iconComponentNameSVG: string;
} {
  const iconName = iconFileName.split('.')[0];
  const iconComponentName = toPascalCase(`MuiIcon ${iconName}`);
  const iconComponentNameSVG = `${iconComponentName}Svg`;
  return {
    iconName,
    iconComponentName,
    iconComponentNameSVG,
  };
}

/**
 * Reads SVG files from `iconsDirPath` and writes a `.tsx` file exporting each
 * icon as a typed MUI `<SvgIcon />` component.
 * @param iconsDirPath - Directory containing source SVG files.
 * @param buildPath - Output directory (wiped and recreated each run).
 * @param iconsTsxPath - Path of the generated `.tsx` file in `buildPath`.
 */
function generateMuiSvgIcons(
  iconsDirPath: string,
  buildPath: string,
  iconsTsxPath: string,
): void {
  console.log(
    'Generating Material UI <SvgIcon /> Components from icon SVG files...',
  );

  if (existsSync(buildPath)) {
    rmSync(buildPath, { recursive: true, force: true });
  }
  mkdirSync(buildPath);
  writeFileSync(iconsTsxPath, '');

  const iconFileNames = readdirSync(iconsDirPath);

  iconFileNames.sort();
  let iconsTsx = "import React from 'react';\n";
  iconsTsx +=
    "import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';\n\n";

  iconFileNames.forEach((iconFileName) => {
    const { iconComponentNameSVG } = getIconNames(iconFileName);
    iconsTsx += `import { ReactComponent as ${iconComponentNameSVG} } from '../assets/${iconFileName}';\n`;
  });

  iconsTsx += '\n';
  iconFileNames.forEach((iconFileName, iconFileIndex) => {
    const iconSrc = readFileSync(`${iconsDirPath}${iconFileName}`, {
      encoding: 'utf8',
    });
    const viewBoxStrIndex = iconSrc.indexOf('viewBox');
    const viewBoxOpeningQuoteIndex = iconSrc.indexOf('"', viewBoxStrIndex);
    const viewBoxClosingQuoteIndex = iconSrc.indexOf(
      '"',
      viewBoxOpeningQuoteIndex + 1,
    );
    const viewBoxValues = iconSrc.slice(
      viewBoxOpeningQuoteIndex + 1,
      viewBoxClosingQuoteIndex,
    );
    const { iconComponentName, iconComponentNameSVG } =
      getIconNames(iconFileName);
    if (iconFileIndex > 0) {
      iconsTsx += '\n';
    }
    iconsTsx += `export function ${iconComponentName}(props: SvgIconProps) {\n`;
    iconsTsx += `  return (\n`;
    iconsTsx += `    <SvgIcon component={${iconComponentNameSVG}} viewBox="${viewBoxValues}" {...props} />\n`;
    iconsTsx += `  );\n`;
    iconsTsx += '}\n';
  });

  appendFileSync(iconsTsxPath, iconsTsx);
}

const basePath = path.resolve('src');
const iconsDirPath = `${basePath}/assets/`;
const buildPath = `${basePath}/icons`;
const iconsTsxPath = `${buildPath}/_dynamically-generated-icons-DO-NOT-EDIT.tsx`;

generateMuiSvgIcons(iconsDirPath, buildPath, iconsTsxPath);
