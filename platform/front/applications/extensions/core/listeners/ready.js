onetype.EmitOn('settings.ready', () =>
{
	const saved = settings.Fn('get', 'extensions.installed', null);

	if(saved === null)
	{
		return;
	}

	Object.values(extensions.Items()).forEach((item) =>
	{
		item.Set('installed', saved.includes(item.Get('id')), false);
	});
});
