editor.toolbar.Fn('activate', function(id)
{
	const item = editor.toolbar.ItemGet(id);

	if(!item)
	{
		return null;
	}

	if(item.Get('active'))
	{
		return null;
	}

	item.Set('active', true);
	onetype.Emit('editor.toolbar.activate', {item});

	return item;
});
