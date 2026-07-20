import packages from '#packages/addon.js';
import assets from '@onetype/framework/assets';
import { join } from 'path';

packages.Fn('item.load.front', function(item)
{
	const order = 10000 + item.Fn('find.order');

	const front = join(item.Get('path'), 'front');

	assets.Item({ type: 'js', order, path: front });
	assets.Item({ type: 'css', order, path: front });
});
