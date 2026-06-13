canvas.Fn('release', function()
{
	const focused = settings.Fn('get', 'canvas.focus', null);

	if(!focused)
	{
		return null;
	}

	settings.Fn('set', 'canvas.focus', null);

	onetype.Emit('canvas.blur', { id: focused.id });

	return focused.id;
});
