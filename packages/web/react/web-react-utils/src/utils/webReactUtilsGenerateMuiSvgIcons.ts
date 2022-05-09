import {
  appendFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'fs';
import { camelCase, upperFirst } from 'lodash';

function getIconNames(iconFileName: string): {
  iconName: string;
  iconComponentName: string;
  iconComponentNameSVG: string;
} {
  const iconName = iconFileName.split('.')[0];
  const iconComponentName = upperFirst(camelCase(`${iconName}Icon`));
  const iconComponentNameSVG = `${iconComponentName}Svg`;
  return {
    iconName,
    iconComponentName,
    iconComponentNameSVG,
  };
}

export function generateMuiSvgIcons(
  basePath: string,
  iconsDirPath: string,
  buildPath: string,
  iconsTsxPath: string,
): void {
  // eslint-disable-next-line no-console
  console.log(
    'Generating Material UI <SvgIcon /> Components from icon SVG files...',
  );

  if (existsSync(buildPath)) {
    rmSync(buildPath, {
      recursive: true,
      force: true,
    });
  }
  mkdirSync(buildPath);
  writeFileSync(iconsTsxPath, '');

  const iconFileNames = readdirSync(iconsDirPath);

  let iconsTsx = '';

  iconFileNames.sort();
  iconsTsx = "import React from 'react';\n";
  iconsTsx +=
    "import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';\n\n";

  iconFileNames.forEach((iconFileName) => {
    const { iconComponentNameSVG } = getIconNames(iconFileName);
    iconsTsx += `import { ReactComponent as ${iconComponentNameSVG} } from '../assets/${iconFileName}';\n`;
  });

  iconsTsx += '\n';
  iconsTsx +=
    '/* eslint-disable react/jsx-props-no-spreading, prettier/prettier */\n';
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
    iconsTsx += `export const ${iconComponentName}: React.FunctionComponent<SvgIconProps> = (props) => (\n`;
    iconsTsx += `  <SvgIcon component={${iconComponentNameSVG}} viewBox="${viewBoxValues}" {...props} />\n`;
    iconsTsx += ');\n';
  });
  iconsTsx +=
    '/* eslint-enable react/jsx-props-no-spreading, prettier/prettier */\n';

  appendFileSync(iconsTsxPath, iconsTsx);
}
