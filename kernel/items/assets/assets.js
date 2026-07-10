import assets from '@onetype/framework/assets';
import { resolve } from 'path';
import { readdirSync } from 'fs';

const root = resolve(import.meta.dirname, '..', '..', '..');

assets.Fn('import', ['framework', 'styles'], 100);
assets.Fn('import', ['commands'], 200);
assets.Fn('import', ['database'], 300);
assets.Fn('import', [
	'elements',
	'pages',
	'directives',
	'directives/items',
	'float',
	'ai',
	'cloudflare/images',
	'actions',
	'sources',
	'variables'
], 400);

const home = resolve(root, 'runtimes', 'home', 'front');

assets.Item({ type: 'css', order: 110, path: resolve(home, 'styles') });

assets.Item({ type: 'js', order: 450, path: resolve(home, 'items') });
assets.Item({ type: 'css', order: 450, path: resolve(home, 'items') });

assets.Item({ type: 'js', order: 500, path: resolve(home, 'core') });

assets.Item({ type: 'js', order: 540, path: home, ignore: [resolve(home, 'addons'), resolve(home, 'styles'), resolve(home, 'items'), resolve(home, 'core')] });

assets.Item({ type: 'js', order: 550, path: resolve(home, 'addons') });
assets.Item({ type: 'css', order: 550, path: resolve(home, 'addons') });

const addons = resolve(root, 'addons');

assets.Item({ type: 'js', order: 550, path: resolve(addons, 'modules') });
assets.Item({ type: 'css', order: 550, path: resolve(addons, 'modules') });

assets.Item({ type: 'js', order: 550, path: resolve(addons, 'other') });
assets.Item({ type: 'css', order: 550, path: resolve(addons, 'other') });

for(const name of readdirSync(resolve(addons, 'system'), { withFileTypes: true }))
{
	if(!name.isDirectory())
	{
		continue;
	}

	assets.Item({ type: 'js', order: 550, path: resolve(addons, 'system', name.name, 'front') });
	assets.Item({ type: 'css', order: 550, path: resolve(addons, 'system', name.name, 'front') });
}

assets.Fn('import', ['boot'], 600);
