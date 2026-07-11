import onetype from '@onetype/framework';
import database from '@onetype/framework/database';
import collections from '../addon.js';

collections.Fn('export', async function(slug = null, connection = 'primary')
{
	const knex = database.Fn('connection', connection);
	const list = slug
		? [await collections.Find().filter('slug', slug).one()]
		: await collections.Find().sort('id', 'asc').many();

	if(slug && !list[0])
	{
		throw onetype.Error(404, 'Collection :1: not found.', slug);
	}

	const result = [];

	for(const item of list)
	{
		const runtime = collections.Fn('get', item.Get('slug'));
		const entries = [];

		let last = 0;

		while(true)
		{
			const batch = await runtime.Find().filter('id', last, 'GREATER').sort('id', 'asc').limit(500).many();

			entries.push(...batch.map((one) => one.GetData()));

			if(batch.length < 500)
			{
				break;
			}

			last = batch.at(-1).Get('id');
		}

		const translations = await knex('database_translations')
			.where('entity', 'collections.' + item.Get('slug'))
			.select('entity_id', 'language', 'field', 'value');

		result.push({
			...item.Get(['slug', 'name', 'icon', 'system', 'fields', 'search', 'versions', 'config']),
			entries,
			translations
		});
	}

	return { collections: result };
});
