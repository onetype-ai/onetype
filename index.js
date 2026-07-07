import './core/back/env.js';

import commands from '@onetype/framework/commands';
import database from '@onetype/framework/database';

/* Services */
import '#auth-service/load.js';

/* Addons */
import '#applications/load.js';
import '#projects/load.js';
import '#permissions/load.js';
import '#fonts/load.js';

/* Applications */
import '#application_marketplace/index.js';
import '#application_documentation/index.js';
import '#application_mesh/index.js';


/* Services */
import '@onetype/framework/services/cloudflare/images';

/* Items */
import './core/back/items/assets/assets.js';
import './core/back/items/database/primary.js';
import './core/back/items/commands/health.js';
import './core/back/items/commands/crawl.js';
import './core/back/items/commands/html.js';
import './core/back/items/html/icons.js';

/* Servers */
import './core/back/items/servers/http.js';

/* Expose */
commands.Fn('expose', 'commands:run', '/api/commands/run');
