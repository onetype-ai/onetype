import packages from '#packages/addon.js';

packages.Fn('config.save', function()
{
	const value = Object.values(this.Items()).map((item) => ({
		slug: item.Get('slug'),
		status: item.Get('status'),
		version: item.Get('version')
	}));

	$ot.platform.config.one('packages').Set('value', value);
});
