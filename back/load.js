import platform from './addon.js';

/* Register */
import './core/register/middlewares.js';
import './core/register/emitters.js';

/* Items */
import './items/assets/assets.js';
import './items/database/primary.js';
import './items/commands/health.js';
import './items/commands/html.js';
import './items/html/icons.js';

/* Servers */
import './items/servers/http.js';

export default platform;
