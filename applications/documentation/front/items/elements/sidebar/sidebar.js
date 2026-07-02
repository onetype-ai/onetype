elements.ItemAdd({
	id: 'documentation-sidebar',
	icon: 'menu_book',
	name: 'Documentation Sidebar',
	description: 'Sidebar with documentation categories as groups and articles as items.',
	category: 'Documentation',
	author: 'OneType',
	metadata: { addon: 'documentation' },
	render: function()
	{
		const entry = (article) =>
		{
			return {
				label: article.Get('title'),
				value: String(article.Get('id'))
			};
		};

		const refresh = () =>
		{
			const articles = Object.values(documentation.articles.Items()).filter((item) => item.Get('is_active')).sort((a, b) => a.Get('order') - b.Get('order'));

			this.items = Object.values(documentation.categories.Items()).filter((item) => item.Get('is_active')).sort((a, b) => a.Get('order') - b.Get('order')).map((category) =>
			{
				const inside = articles.filter((article) => String(article.Get('category_id')) === String(category.Get('id')));
				const sections = {};

				for(const article of inside.filter((article) => article.Get('group')))
				{
					const section = article.Get('group');

					sections[section] = sections[section] || [];
					sections[section].push(entry(article));
				}

				return {
					label: category.Get('title'),
					icon: category.Get('icon'),
					items: [
						...inside.filter((article) => !article.Get('group')).map(entry),
						...Object.keys(sections).sort().map((section) =>
						{
							return {
								label: section,
								items: sections[section]
							};
						})
					]
				};
			}).filter((category) => category.items.length);

		};

		refresh();

		this.active = '';

		this.On('@addon.item.added', (item) => ['documentation.articles', 'documentation.categories'].includes(item.addon.GetName()) && refresh());
		this.On('@addon.item.modified', (item) => ['documentation.articles', 'documentation.categories'].includes(item.addon.GetName()) && refresh());
		this.On('@addon.item.removed', (item) => ['documentation.articles', 'documentation.categories'].includes(item.addon.GetName()) && refresh());

		this.open = ({ value }) =>
		{
			this.active = value.value;
		};

		return `<e-navigation-sidebar title="Documentation" :items="items" :active="active" :_click="open"></e-navigation-sidebar>`;
	}
});
