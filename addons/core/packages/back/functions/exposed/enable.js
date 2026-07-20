import onetype from '@onetype/framework';
import packages from '#packages/addon.js';

packages.FnExpose('enable', function(slug)
{
	const item = this.one(slug);

	if(!item)
	{
		return false;
	}

	item.Fn('enable');

	onetype.Emit('platform.packages.enable', { slug: item.Get('slug') });

	return true;
});
