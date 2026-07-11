import packages from '#packages/addon.js';
import { readdirSync, existsSync } from 'fs';
import { resolve, join } from 'path';

packages.Fn('directories', function()
{
	const list = [];
	const roots = [resolve(process.cwd(), 'packages'), resolve(process.cwd(), 'node_modules')];

	for(const root of roots)
	{
		if(!existsSync(root))
		{
			continue;
		}

		for(const entry of readdirSync(root, { withFileTypes: true }))
		{
			if(!entry.isDirectory() && !entry.isSymbolicLink())
			{
				continue;
			}

			if(!entry.name.startsWith('@'))
			{
				list.push(join(root, entry.name));

				continue;
			}

			for(const scoped of readdirSync(join(root, entry.name), { withFileTypes: true }))
			{
				if(scoped.isDirectory() || scoped.isSymbolicLink())
				{
					list.push(join(root, entry.name, scoped.name));
				}
			}
		}
	}

	return list;
});
