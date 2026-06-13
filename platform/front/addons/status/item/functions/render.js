status.Fn('item.render', function(item)
{
	return status.Render(item.Get('id'), { ...item.Get('data') }).Element;
});
