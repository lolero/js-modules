import { config } from 'dotenv';
import { getEnvFileName } from './getEnvFileName';

export function loadEnvConfig(): void {
  const envFileName = getEnvFileName();
  config({ path: envFileName });
}
