onetype.AddonReady('ui.explorer', (explorer) =>
{
	modules.shortcuts.ItemOn('added', (item) =>
	{
		explorer.Item({
			id: 'shortcut-' + item.Get('id'),
			order: 60,
			group: 'Shortcuts',
			prefix: 'shortcuts',
			icon: 'keyboard',
			label: item.Get('name') || item.Get('id'),
			hint: item.Fn('hint'),
			keywords: [item.Get('id')],
			condition: { callback: () => item.Fn('enabled') },
			callback: () => $ot.modules.shortcuts.trigger(item.Get('id'))
		});
	});
});
