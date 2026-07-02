onetype.EmitOn('settings.ready', () =>
{
	const map = $ot.settings.get('assistants.preferences', {});

	Object.entries(map).forEach(([id, preferences]) =>
	{
		const item = assistants.ItemGet(id);

		item && item.Set('preferences', preferences);
	});
});
