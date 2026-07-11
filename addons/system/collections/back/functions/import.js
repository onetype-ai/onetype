import database from '@onetype/framework/database';
import collections from '../addon.js';

collections.Fn('import', async function(data, connection = 'primary')
{
	const knex = database.Fn('connection', connection);
	const map = {};
	const summary = { collections: 0, entries: 0 };

	for(const entry of data.collections)
	{
		const existing = await collections.Find().filter('slug', entry.slug).one();

		if(!existing)
		{
			await collections.Fn('sync', {
				slug: entry.slug,
				name: entry.name,
				icon: entry.icon,
				system: entry.system === true,
				fields: entry.fields,
				search: entry.search,
				versions: entry.versions,
				config: entry.config
			});
		}

		const runtime = collections.Fn('get', entry.slug);

		map[entry.slug] = {};

		for(const record of entry.entries)
		{
			const { id, collection, deleted_at, ...values } = record;
			const created = await runtime.ItemAdd(values).Create();

			map[entry.slug][String(id)] = created.Get('id');
			summary.entries++;
		}

		summary.collections++;
	}

	for(const entry of data.collections)
	{
		const references = entry.fields.filter((field) => field.reference && map[field.reference]);
		const runtime = collections.Fn('get', entry.slug);

		for(const record of entry.entries)
		{
			const update = {};

			for(const field of references)
			{
				const target = map[field.reference];
				const value = record[field.name];

				if(value === null || value === undefined)
				{
					continue;
				}

				update[field.name] = Array.isArray(value)
					? value.map((one) => target[String(one)] ?? one)
					: (target[String(value)] ?? value);
			}

			if(Object.keys(update).length)
			{
				const item = await runtime.Find().filter('id', map[entry.slug][String(record.id)]).one();

				for(const [field, value] of Object.entries(update))
				{
					item.Set(field, value);
				}

				await item.Update().whitelist(references.map((field) => field.name));
			}
		}

		const rows = (entry.translations || []).map((row) => ({
			entity: 'collections.' + entry.slug,
			entity_id: String(map[entry.slug][String(row.entity_id)] ?? row.entity_id),
			language: row.language,
			field: row.field,
			value: row.value,
			updated_at: new Date().toISOString()
		}));

		if(rows.length)
		{
			await knex('database_translations')
				.insert(rows)
				.onConflict(['entity', 'entity_id', 'language', 'field'])
				.merge(['value', 'updated_at']);
		}
	}

	console.log('Import done — :1 collections, :2 entries', summary.collections, summary.entries);

	return summary;
});
