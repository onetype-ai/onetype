import database from '@onetype/framework/database';
import collections from '../addon.js';

collections.Fn('partition', async function(id, connection = 'primary')
{
	const knex = database.Fn('connection', connection);
	const present = (await knex.raw(`select to_regclass(?) as name`, ['entries_' + id])).rows[0].name;

	if(present)
	{
		return;
	}

	await knex.raw(`CREATE TABLE IF NOT EXISTS ?? PARTITION OF entries FOR VALUES IN (${Number(id)})`, ['entries_' + id]);
});
