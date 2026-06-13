onetype.AddonReady('explorer', (explorer) =>
{
	const hint = (item) =>
	{
		return item.Get('installed') ? 'Installed — click to uninstall' : item.Get('price') + ' — click to install';
	};

	extensions.ItemOn('add', (item) =>
	{
		explorer.Item({
			id: 'extension-' + item.Get('id'),
			order: 70,
			group: 'Extensions',
			prefix: 'extensions',
			icon: item.Get('icon'),
			label: item.Get('name'),
			hint: hint(item),
			keywords: [item.Get('id'), item.Get('category'), item.Get('author')],
			callback: () => $ot.command(item.Get('installed') ? 'extensions:uninstall' : 'extensions:install', { id: item.Get('id') })
		});
	});

	extensions.ItemOn('remove', (item) =>
	{
		explorer.ItemRemove('extension-' + item.Get('id'));
	});

	const sync = (change) =>
	{
		const item = extensions.ItemGet(change.id);
		const entry = explorer.ItemGet('extension-' + change.id);

		if(item && entry)
		{
			entry.Set('hint', hint(item));
		}
	};

	onetype.EmitOn('extensions.install', sync);
	onetype.EmitOn('extensions.uninstall', sync);
});
