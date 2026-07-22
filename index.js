import onetype from '@onetype/framework';
import { resolve } from 'path';

import '@onetype/framework/commands';
import '@onetype/framework/pipelines';
import '@onetype/framework/canon';
import '@onetype/framework/database';
import '@onetype/framework/servers';
import '@onetype/framework/assets';
import '@onetype/framework/html';

process.loadEnvFile(resolve(process.cwd(), '.env'));

onetype.Strict(true);

await import('#platform/load.js');
