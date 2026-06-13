shortcuts.ItemOn('added', (item) =>
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
		condition: () => item.Fn('enabled'),
		callback: () => $ot.command('shortcuts:trigger', { id: item.Get('id') })
	});
});
