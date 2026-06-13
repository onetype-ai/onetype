onetype.EmitOn('settings.ready', () =>
{
	const map = settings.Fn('get', 'assistants.preferences', {});

	Object.entries(map).forEach(([id, preferences]) =>
	{
		const item = assistants.ItemGet(id);

		item && item.Set('preferences', preferences);
	});
});
