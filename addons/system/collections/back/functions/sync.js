import collections from '../addon.js';

const stable = (value) => JSON.stringify(value, (key, entry) => entry && typeof entry === 'object' && !Array.isArray(entry)
	? Object.keys(entry).sort().reduce((sorted, name) => (sorted[name] = entry[name], sorted), {})
	: entry);

collections.Fn('sync', async function(definition)
{
	let item = await collections.Find().filter('slug', definition.slug).one();

	if(!item)
	{
		item = await collections.ItemAdd({ ...definition }).Create();
		console.log('Collection :1 created (:2, :3 fields)', definition.slug, 'entries_' + item.Get('id'), definition.fields.length);
	}
	else if(definition.system)
	{
		const changed = ['name', 'icon', 'fields', 'search', 'versions'].some((key) => stable(item.Get(key)) !== stable(definition[key]));

		if(changed)
		{
			item.Set('name', definition.name);
			item.Set('icon', definition.icon);
			item.Set('system', true);
			item.Set('fields', definition.fields);
			item.Set('search', definition.search);
			item.Set('versions', definition.versions);

			await item.Update();
			console.log('Collection :1 definition updated (:2 fields)', definition.slug, definition.fields.length);
		}
	}

	await collections.Fn('apply', item);

	return item;
});
