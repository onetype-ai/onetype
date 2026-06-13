canvas.Fn('item.render', function(item)
{
	return canvas.Render(item.Get('id'), { ...item.Get('data') }).Element;
});
