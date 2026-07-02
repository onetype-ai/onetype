elements.ItemOn('modified', (item) =>
{
	documentation.articles.Item({
		id: 'element-' + item.Get('id'),
		category_id: 'elements',
		group: item.Get('category'),
		name: item.Get('id'),
		title: item.Get('name'),
		content: item.Get('description')
	});
});
