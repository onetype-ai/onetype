editor.pages.Fn('activate', function(id)
{
	const item = editor.pages.ItemGet(id);

	if(!item)
	{
		return null;
	}

	editor.pages.Fn('deactivate');

	item.Set('active', true);
	onetype.Emit('editor.pages.activate', {page: item});

	return item;
});
