import database from '@onetype/framework/database';
import collections from '../addon.js';

collections.Fn('import', async function(data, connection = 'primary')
{
	const knex = database.Fn('connection', connection);
	const map = {};
	const deferred = [];
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

		map[entry.slug] = {};
	}

	await knex.transaction(async (trx) =>
	{
		for(const entry of data.collections)
		{
			const runtime = collections.Fn('get', entry.slug);
			const references = entry.fields.filter((field) => field.reference && map[field.reference]);

			for(const record of entry.entries)
			{
				const { id, collection, deleted_at, ...values } = record;
				const missing = [];

				for(const field of references)
				{
					const target = map[field.reference];
					const value = values[field.name];

					if(value === null || value === undefined)
					{
						continue;
					}

					if(Array.isArray(value))
					{
						if(value.some((one) => !(String(one) in target)))
						{
							missing.push(field.name);
							continue;
						}

						values[field.name] = value.map((one) => target[String(one)]);
					}
					else if(String(value) in target)
					{
						values[field.name] = target[String(value)];
					}
					else
					{
						missing.push(field.name);
					}
				}

				const created = await runtime.ItemAdd(values).Create({ connection: trx });

				map[entry.slug][String(id)] = created.Get('id');
				summary.entries++;

				if(missing.length)
				{
					deferred.push({ slug: entry.slug, id: String(id), fields: missing, record });
				}
			}

			summary.collections++;
		}

		for(const need of deferred)
		{
			const runtime = collections.Fn('get', need.slug);
			const definition = data.collections.find((entry) => entry.slug === need.slug);
			const item = await runtime.Find({ connection: trx }).filter('id', map[need.slug][need.id]).one();

			for(const name of need.fields)
			{
				const field = definition.fields.find((one) => one.name === name);
				const target = map[field.reference];
				const value = need.record[name];

				item.Set(name, Array.isArray(value)
					? value.map((one) => target[String(one)] ?? one)
					: (target[String(value)] ?? value));
			}

			await item.Update({ connection: trx }).whitelist(need.fields);
		}

		for(const entry of data.collections)
		{
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
				await trx('database_translations')
					.insert(rows)
					.onConflict(['entity', 'entity_id', 'language', 'field'])
					.merge(['value', 'updated_at']);
			}
		}
	});

	console.log('Import done — :1 collections, :2 entries', summary.collections, summary.entries);

	return summary;
});
