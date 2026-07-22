import platform from '#platform/addon.js';
import { existsSync } from 'fs';
import { join } from 'path';
import { pathToFileURL } from 'url';

platform.packages.Fn('item.load.back', async function(item)
{
    const file = join(item.Get('path'), 'back', 'load.js');

    if(existsSync(file))
    {
        await import(pathToFileURL(file));
    }
});
