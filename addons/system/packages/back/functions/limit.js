import packages from '#packages/addon.js';
import config from '#config/addon.js';

packages.Fn('limit', function(slug, key)
{
	const overrides = config.Fn('get', 'limits') || {};

	if(overrides[slug] && key in overrides[slug])
	{
		return overrides[slug][key];
	}

	const item = Object.values(this.Items()).find((candidate) => candidate.Get('slug') === slug);
	const limits = item ? item.Get('limits') : {};

	return key in limits ? limits[key] : null;
});
