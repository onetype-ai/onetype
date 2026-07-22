import platform from './addon.js';

import './functions/do.author.js';
import './functions/exposed/reload.js';

import './items/commands/reload.js';

import './_/register/middlewares.js';
import './_/register/emitters.js';

import './_/assets/platform.js';

import './items/assets/assets.js';
import './items/database/primary.js';
import './items/commands/health.js';
import './items/commands/html.js';
import './items/commands/run.js';
import './items/html/assets.js.js';
import './items/html/assets.css.js';
import './items/html/state.js';

import './listeners/boot.js';

import './addons/config/load.js';
import './addons/runtimes/load.js';
import './addons/packages/load.js';
import './addons/users/load.js';
import './addons/tokens/load.js';

await onetype.Middleware('platform.boot');
await onetype.Emit('platform.boot');

await import('./items/servers/http.js');

export default platform;
