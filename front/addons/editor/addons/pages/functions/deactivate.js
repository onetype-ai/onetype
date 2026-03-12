editor.pages.Fn('deactivate', function()
{
	const items = editor.pages.Items();

	for(const key in items)
	{
		if(items[key].Get('active'))
		{
			items[key].Set('active', false);
		}
	}

	onetype.Emit('editor.pages.deactivate');
});
