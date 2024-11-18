import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url); //Proporciona la ruta desde donde se hace el import

export const __dirname = dirname(__filename);
