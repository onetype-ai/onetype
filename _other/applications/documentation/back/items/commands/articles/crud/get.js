import commands from '@onetype/framework/commands';
import documentation from '../../../../../shared/load.js';

commands.Item({
	id: 'documentation:articles:get',
	exposed: true,
	in: {
		id: ['string', null, true]
	},
	out: 'documentation.article',
	callback: async function(properties, resolve)
	{
		const item = await documentation.articles.Find()
			.filter('id', properties.id)
			.filter('deleted_at', null, 'NULL')
			.one();

		if(!item)
		{
			return resolve(null, 'Article not found.', 404);
		}

		resolve(item.GetData());
	}
});
