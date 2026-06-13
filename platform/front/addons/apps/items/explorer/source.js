onetype.AddonReady('explorer', (explorer) =>
{
	apps.ItemOn('add', (item) =>
	{
		explorer.Item({
			id: 'app-' + item.Get('id'),
			order: 10,
			group: 'Applications',
			prefix: 'apps',
			icon: item.Get('icon'),
			label: item.Get('label'),
			hint: 'Open application',
			keywords: [item.Get('id')],
			callback: () => $ot.command('apps:switch', { id: item.Get('id') })
		});
	});

	apps.ItemOn('remove', (item) =>
	{
		explorer.ItemRemove('app-' + item.Get('id'));
	});
});
