editor.toolbar.Fn('deactivate', function(id)
{
	const item = editor.toolbar.ItemGet(id);

	if(!item)
	{
		return null;
	}

	if(!item.Get('active'))
	{
		return null;
	}

	item.Set('active', false);
	onetype.Emit('editor.toolbar.deactivate', {item});

	return item;
});
