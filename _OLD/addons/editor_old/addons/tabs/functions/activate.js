editor.tabs.Fn('activate', function(id)
{
	const item = editor.tabs.ItemGet(id);

	if(!item)
	{
		return null;
	}

	if(item.Get('active'))
	{
		return null;
	}

	editor.tabs.Fn('deactivate', item.Get('position'));

	item.Set('active', true);
	onetype.Emit('editor.tabs.activate', {item});

	return item;
});
