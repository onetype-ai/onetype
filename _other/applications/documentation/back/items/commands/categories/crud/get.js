import commands from '@onetype/framework/commands';
import documentation from '../../../../../shared/load.js';

commands.Item({
	id: 'documentation:categories:get',
	exposed: true,
	in: {
		id: ['string', null, true]
	},
	out: 'documentation.category',
	callback: async function(properties, resolve)
	{
		const item = await documentation.categories.Find()
			.filter('id', properties.id)
			.filter('deleted_at', null, 'NULL')
			.one();

		if(!item)
		{
			return resolve(null, 'Category not found.', 404);
		}

		resolve(item.GetData());
	}
});
