import onetype from '@onetype/framework';
import { resolve } from 'path';

/* Addons */
import '#runtimes/load.js';
import '#packages/load.js';
import '#users/load.js';
import '#tokens/load.js';
import '#persistence/load.js';

/* Environment */
process.loadEnvFile(resolve(process.cwd(), '.env'));

/* Boot */
await onetype.Middleware('boot');
await onetype.Emit('boot');

/* Platform */
await import('#platform/load.js');
