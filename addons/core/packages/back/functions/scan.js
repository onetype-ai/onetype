import packages from '#packages/addon.js';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

packages.Fn('scan', function()
{
	for(const directory of this.Fn('directories'))
	{
		const file = join(directory, 'onetype.json');

		if(!existsSync(file))
		{
			continue;
		}

		const manifest = JSON.parse(readFileSync(file, 'utf8'));

		if(Object.values(this.Items()).some((item) => item.Get('slug') === manifest.slug))
		{
			continue;
		}

		this.Item({ ...manifest, path: directory });
	}

	return this.Items();
});
