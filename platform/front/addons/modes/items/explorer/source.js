onetype.AddonReady('explorer', (explorer) =>
{
	modes.ItemOn('add', (item) =>
	{
		explorer.Item({
			id: 'mode-' + item.Get('id'),
			order: 20,
			group: 'Modes',
			prefix: 'modes',
			icon: item.Get('icon') || 'tune',
			label: item.Get('label') || item.Get('id'),
			hint: 'Switch mode',
			keywords: [item.Get('id')],
			app: [item.Get('app')],
			callback: () => $ot.command('modes:switch', { id: item.Get('id') })
		});
	});

	modes.ItemOn('remove', (item) =>
	{
		explorer.ItemRemove('mode-' + item.Get('id'));
	});
});
