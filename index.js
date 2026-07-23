import onetype from '@onetype/framework';
import { resolve } from 'path';

import 'addon-commands';
import 'addon-pipelines';
import 'addon-canon';
import 'addon-database';
import 'addon-servers';
import 'addon-assets';
import 'addon-html';

process.loadEnvFile(resolve(process.cwd(), '.env'));

onetype.Strict(true);

await import('#platform/load.js');
