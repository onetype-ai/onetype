import packages from '#packages/addon.js';

packages.Fn('load', async function()
{
	this.methods.ordered = () =>
	{
		return Object.values(this.Items())
			.filter((item) => item.Get('status') === 'enabled')
			.map((item) => ({ item, order: item.Fn('find.order') }))
			.sort((one, two) => one.order - two.order)
			.map((entry) => entry.item);
	};

	for(const item of this.methods.ordered())
	{
		item.Fn('load.front');

		await item.Fn('load.back');
	}
});
