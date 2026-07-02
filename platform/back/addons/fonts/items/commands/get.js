import commands from '@onetype/framework/commands';
import fonts from '#fonts/addon.js';

commands.Item({
	id: 'fonts:get',
	exposed: true,
	method: 'GET',
	endpoint: '/api/fonts/:id',
	in: {
		id: ['string', null, true]
	},
	out: {
		font: ['object', null, true]
	},
	callback: async function(properties, resolve)
	{
		const item = await fonts.Find()
			.filter('id', properties.id)
			.one();

		if(!item)
		{
			return resolve(null, 'Not found.', 404);
		}

		resolve({ font: item.Get(['id', 'name', 'slug', 'category', 'popular', 'weights', 'styles', 'updated_at', 'created_at']) });
	}
});
