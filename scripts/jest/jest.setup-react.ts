import { TextDecoder, TextEncoder } from 'util';
import '@testing-library/jest-dom/jest-globals';

Object.assign(global, { TextDecoder, TextEncoder });
