import packages from '#packages/addon.js';
import { existsSync } from 'fs';
import { join } from 'path';
import { pathToFileURL } from 'url';

packages.Fn('back', async function()
{
	for(const item of Object.values(this.Items()))
	{
		const file = join(item.Get('path'), 'back', 'load.js');

		if(item.Get('status') !== 'enabled' || !existsSync(file))
		{
			continue;
		}

		await import(pathToFileURL(file));
	}
});
