import './platform/back/env.js';

import commands from '@onetype/framework/commands';
import database from '@onetype/framework/database';

/* Services */
import '#auth-service/load.js';

/* Addons */
import '#sites/load.js';
import '#fonts/load.js';
import '#categories/load.js';
import '#extensions/load.js';

/* Services */
import '@onetype/framework/services/cloudflare/images';

/* Items */
import './platform/back/items/assets/assets.js';
import './platform/back/items/database/primary.js';
import './platform/back/items/commands/health.js';
import './platform/back/items/commands/crawl.js';
import './platform/back/items/commands/html.js';
import './platform/back/items/html/fonts.js';
import './platform/back/items/html/icons.js';

/* Servers */
import './platform/back/items/servers/http.js';

/* Expose */
commands.Fn('expose', 'commands:run', '/api/commands/run');
