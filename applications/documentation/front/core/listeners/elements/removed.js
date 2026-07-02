elements.ItemOn('remove', (item) =>
{
	documentation.articles.ItemRemove('element-' + item.Get('id'));
});
