packages.CommandAdd({
	id: 'enable',
	description: 'Enable a package on the instance. The package loads on the next boot.',
	in: {
		slug: {
			type: 'string',
			required: true,
			description: 'Slug of the package to enable.'
		}
	},
	out: 'platform.package',
	callback: async function(properties, resolve)
	{
		const { data, message, code } = await packages.enable(properties.slug);

		if(code !== 200)
		{
			$ot.float.toast({ message, type: 'error' });

			return resolve(null, message, code);
		}

		$ot.float.toast({ message, type: 'success' });

		resolve(data);
	}
});
