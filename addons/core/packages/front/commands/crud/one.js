packages.CommandAdd({
	id: 'one',
	description: 'Read one package by its slug.',
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
		const { data, message, code } = await packages.one(properties.slug, true);

		if(code !== 200)
		{
			$ot.float.toast({ message, type: 'error' });

			return resolve(null, message, code);
		}

		resolve(data);
	}
});
