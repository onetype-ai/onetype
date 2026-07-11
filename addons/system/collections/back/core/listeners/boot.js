import onetype from '@onetype/framework';
import database from '@onetype/framework/database';
import collections from '../../addon.js';

onetype.MiddlewareIntercept('boot', async (middleware) =>
{
	await database.Fn('ready');

	const declared = collections.StoreGet('declared') || [];

	for(const definition of declared)
	{
		await collections.Fn('sync', definition);
	}

	const total = await collections.Find().count();

	console.log('Collections ready — :1 declared, :2 total', declared.length, total);

	await middleware.next();
});
