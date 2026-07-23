import platform from './addon.js';

import assets from 'addon-assets';
import commands from 'addon-commands';

import './functions/do.author.js';
import './functions/run.server.js';
import './functions/exposed/reload.js';

import './items/commands/reload.js';

import './items/onetype-middlewares/platform.boot.js';
import './items/onetype-middlewares/platform.reload.js';

import './_/assets/platform.js';

import './items/database/primary.js';
import './items/commands/health.js';
import './items/commands/html.js';
import './items/html/assets.js.js';
import './items/html/assets.css.js';
import './items/html/state.js';
import './items/onetype-emitters/platform.boot.js';
import './items/onetype-emitters/platform.reload.js';

import './listeners/emitters/platform.boot.js';

import './addons/config/load.js';
import './addons/runtimes/load.js';
import './addons/packages/load.js';
import './addons/users/load.js';
import './addons/tokens/load.js';

import 'addon-commands/back/_/assets/commands.js';
import 'addon-database/back/_/assets/database.js';
import 'addon-float/back/_/assets/float.js';
import 'addon-actions/back/_/assets/actions.js';
import 'addon-bugs/back/_/assets/bugs.js';
import 'addon-events/back/_/assets/events.js';
import 'addon-schedules/back/_/assets/schedules.js';
import 'addon-shortcuts/back/_/assets/shortcuts.js';
import 'addon-sources/back/_/assets/sources.js';
import 'addon-variables/back/_/assets/variables.js';
import 'addon-directives/back/_/assets/directives.js';
import 'addon-editor/back/_/assets/editor.js';
import 'addon-elements/back/_/assets/elements.js';
import 'addon-elements/back/items/canon-placements/elements.js';
import 'addon-elements/back/items/canon-patterns/elements.js';
import 'addon-pages/back/_/assets/pages.js';
import 'addon-transforms/back/_/assets/transforms.js';

assets.Fn('get.import', ['framework'], 100);
assets.Fn('get.import', ['commands'], 200);
assets.Fn('get.import', ['database'], 300);
assets.Fn('get.import', ['elements'], 400);
assets.Fn('get.import', ['pages'], 410);
assets.Fn('get.import', ['directives'], 420);
assets.Fn('get.import', ['float'], 430);
assets.Fn('get.import', ['platform'], 500);

assets.get.commands();

commands.Fn('do.expose', 'commands:run', '/api/commands/run');

await onetype.middlewares.run('platform.boot');
await onetype.emitters.fire('platform.boot');

platform.Fn('run.server');

export default platform;
