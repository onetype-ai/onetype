import packages from '#packages/addon.js';

packages.CommandAdd({
	id: 'one',
	description: 'Read one package by its slug.',
	exposed: true,
	method: 'GET',
	endpoint: '/api/packages/:slug',
	in: {
		slug: {
			type: 'string',
			required: true,
			description: 'Slug of the package to read.'
		}
	},
	out: 'platform.package',
	callback: async function(properties, resolve)
	{
		const item = $ot.platform.packages.one(properties.slug);

		if(!item)
		{
			return resolve(null, 'Package ' + properties.slug + ' not found.', 404);
		}

		resolve(item.GetData());
	}
});
