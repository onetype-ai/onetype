ui.canvas.Fn('release', function()
{
	const focused = $ot.settings.get('ui.canvas.focus', null);

	if(!focused)
	{
		return null;
	}

	$ot.settings.set('ui.canvas.focus', null);

	onetype.Emit('ui.canvas.blur', { id: focused.id });

	return focused.id;
});
