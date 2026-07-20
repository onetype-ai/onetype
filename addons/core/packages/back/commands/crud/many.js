import packages from '#packages/addon.js';

packages.CommandAdd({
	id: 'many',
	description: 'List every package of the instance with its manifest and status.',
	exposed: true,
	method: 'GET',
	endpoint: '/api/packages',
	out: {
		items: {
			type: 'array',
			each: 'platform.package',
			description: 'Every package of the instance.'
		}
	},
	callback: async function(properties, resolve)
	{
		resolve({ items: $ot.platform.packages.many().map((item) => item.GetData()) });
	}
});
