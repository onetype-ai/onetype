onetype.EmitOn('settings.ready', () =>
{
	const saved = $ot.settings.get('extensions.installed', null);

	if(saved === null)
	{
		return;
	}

	Object.values(extensions.Items()).forEach((item) =>
	{
		item.Set('installed', saved.includes(item.Get('id')), false);
	});
});
