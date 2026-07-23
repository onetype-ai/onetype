import assets from 'addon-assets';
import platform from '#platform/addon.js';
import { join } from 'path';

platform.packages.Fn('item.load.front', function(item)
{
    const order = 10000 + item.Fn('find.order');

    const front = join(item.Get('path'), 'front');

    const condition = function()
    {
        return item.Fn('is.scoped', this.assets.scope);
    };

    assets.Item({ type: 'js', order, path: front, condition });
    assets.Item({ type: 'css', order, path: front, condition });
});
