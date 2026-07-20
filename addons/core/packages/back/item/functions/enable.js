import config from '#config/addon.js';
import packages from '#packages/addon.js';

packages.Fn('item.enable', function(item)
{
	item.Set('status', 'enabled');

	const instance = Object.values(config.Items()).find((candidate) => candidate.Get('key') === 'packages');

	instance.Set('value', {
		...instance.Get('value'),
		[item.Get('slug')]: {
			status: 'enabled',
			version: item.Get('version')
		}
	});
});
