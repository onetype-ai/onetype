import commands from '@onetype/framework/commands';
import permissions from '#shared/system/permissions/addon.js';

commands.Item({
	id: 'permissions:get',
	exposed: true,
	method: 'GET',
	endpoint: '/api/permissions/:id',
	in: {
		id: ['string', null, true]
	},
	out: 'permission',
	callback: async function(properties, resolve)
	{
		const item = await permissions.Find()
			.filter('id', properties.id)
			.filter('deleted_at', null, 'NULL')
			.one();

		if(!item)
		{
			return resolve(null, 'Permission not found.', 404);
		}

		resolve(item.GetData());
	}
});
