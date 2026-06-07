layouts.Fn('item.render', function(item)
{
	return layouts.Render(item.Get('id'), { ...item.Get('data') }).Element;
});
