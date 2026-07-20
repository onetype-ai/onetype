import onetype from '@onetype/framework';
import { resolve } from 'path';

/* Framework */
import '@onetype/framework/commands';
import '@onetype/framework/database';
import '@onetype/framework/servers';
import '@onetype/framework/assets';
import '@onetype/framework/html';

/* Platform */
import '#platform/addon.js';

/* Addons */
import '#runtimes/load.js';
import '#packages/load.js';

/* Environment */
process.loadEnvFile(resolve(process.cwd(), '.env'));

/* Boot */
await onetype.Middleware('boot');
await onetype.Emit('boot');

/* Platform */
await import('#platform/load.js');
