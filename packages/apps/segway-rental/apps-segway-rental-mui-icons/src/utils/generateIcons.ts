import { generateMuiSvgIcons } from '@js-modules/web-react-utils';
import * as path from 'path';

const basePath = path.resolve('src');
const iconsDirPath = `${basePath}/assets/`;
const buildPath = `${basePath}/icons`;
const iconsTsxPath = `${buildPath}/dynamically-generated-icons-DO-NOT-EDIT.tsx`;

generateMuiSvgIcons(basePath, iconsDirPath, buildPath, iconsTsxPath);
