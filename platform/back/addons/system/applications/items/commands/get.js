import commands from '@onetype/framework/commands';
import applications from '#shared/system/applications/addon.js';

commands.Item({
	id: 'applications:get',
	exposed: true,
	method: 'GET',
	endpoint: '/api/applications/:slug',
	in: {
		slug: ['string', null, true]
	},
	out: 'application',
	callback: async function(properties, resolve)
	{
		const item = await applications.Find()
			.filter('slug', properties.slug)
			.one();

		if(!item)
		{
			return resolve(null, 'Application not found.', 404);
		}

		resolve(item.GetData());
	}
});
