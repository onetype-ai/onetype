editor.tabs.Fn('deactivate', function(position)
{
	const items = editor.tabs.Items();

	for(const key in items)
	{
		if(items[key].Get('position') === position && items[key].Get('active'))
		{
			items[key].Set('active', false);
		}
	}

	onetype.Emit('editor.tabs.deactivate', {position});
});
