elements.ItemAdd({
	id: 'documentation-home',
	icon: 'menu_book',
	name: 'Documentation Home',
	description: 'Landing screen of the documentation app with search, category cards and mode shortcuts.',
	category: 'Documentation',
	author: 'OneType',
	metadata: { addon: 'documentation' },
	render: function()
	{
		const colors = {
			platform: 'brand',
			framework: 'blue',
			guides: 'green',
			elements: 'orange'
		};

		const blurbs = {
			platform: 'Apps, modes, layouts and everything that shapes the shell.',
			framework: 'Addons, items, emitters and the reactive core.',
			guides: 'Step by step walkthroughs, from zero to a working app.',
			elements: 'The full UI element library with every prop documented.'
		};

		const active = (addon) =>
		{
			return Object.values(addon.Items()).filter((item) => item.Get('is_active')).sort((a, b) => a.Get('order') - b.Get('order'));
		};

		const refresh = () =>
		{
			const articles = active(documentation.articles);
			const categories = active(documentation.categories);

			this.total = articles.length;

			this.popular = articles.slice(0, 4).map((article) => article.Get('title'));

			this.categories = categories.map((category) =>
			{
				const inside = articles.filter((article) => String(article.Get('category_id')) === String(category.Get('id')));

				return {
					name: category.Get('name'),
					icon: category.Get('icon'),
					title: category.Get('title'),
					color: colors[category.Get('name')] || 'brand',
					description: blurbs[category.Get('name')] || '',
					meta: [{ icon: 'article', label: inside.length + (inside.length === 1 ? ' article' : ' articles') }]
				};
			}).filter((category) => category.meta[0].label !== '0 articles');

			this.results = !this.query ? [] : articles.filter((article) => article.Get('title').toLowerCase().includes(this.query.toLowerCase())).slice(0, 8).map((article) =>
			{
				const category = categories.find((entry) => String(entry.Get('id')) === String(article.Get('category_id')));

				return {
					id: article.Get('id'),
					title: article.Get('title'),
					category: category ? category.Get('title') : ''
				};
			});
		};

		this.query = '';

		refresh();

		this.On('@addon.item.added', (item) => ['documentation.articles', 'documentation.categories'].includes(item.addon.GetName()) && refresh());
		this.On('@addon.item.removed', (item) => ['documentation.articles', 'documentation.categories'].includes(item.addon.GetName()) && refresh());

		this.input = ({ value }) =>
		{
			this.query = value;
			refresh();
		};

		this.chip = ({ value }) =>
		{
			if(value)
			{
				this.query = value;
				refresh();
			}
		};

		this.pick = () => {};

		this.developer = () => $ot.navigate({ mode: 'developer' });
		this.reference = () => $ot.navigate({ mode: 'api' });

		return `
			<div class="box">
				<e-global-heading
					eyebrow="Documentation"
					title="Everything you need to <em>build</em>"
					:description="'Guides, concepts and reference for the whole platform, from the reactive core to every element, across ' + total + ' articles.'"
					element="h1"
					align="center"
					size="l">
					<div slot="bottom" class="hero">
						<div class="finder">
							<e-form-input icon="search" placeholder="Search documentation..." size="l" :value="query" :clearable="true" :_input="input" :_change="input"></e-form-input>
						</div>
						<div ot-if="popular.length && !query" class="popular">
							<e-global-tags :items="popular" size="s" background="bg-2" :_change="chip"></e-global-tags>
						</div>
					</div>
				</e-global-heading>
				<div ot-if="query && results.length" class="results">
					<div ot-for="entry in results" :ot-key="entry.id" class="result">
						<i>article</i>
						<span class="title">{{ entry.title }}</span>
						<span ot-if="entry.category" class="category">{{ entry.category }}</span>
						<i class="go">arrow_forward</i>
					</div>
				</div>
				<div ot-if="query && !results.length" class="blank">
					<e-status-empty icon="search_off" title="No results" :description="'No articles match ' + query + '.'" size="s" :background="2"></e-status-empty>
				</div>
				<div ot-if="!query" class="sections">
					<div class="ot-grid-auto-l">
						<e-cards-item ot-for="entry in categories" :ot-key="entry.name" :icon="entry.icon" :color="entry.color" :title="entry.title" :description="entry.description" :meta="entry.meta" :_click="pick"></e-cards-item>
					</div>
					<div class="modes">
						<e-cards-item icon="code" color="brand" eyebrow="Mode" title="Developer" description="Concepts, architecture and guides for building on the platform." :meta="[{ icon: 'arrow_forward', label: 'Open Developer' }]" :_click="developer"></e-cards-item>
						<e-cards-item icon="data_object" color="blue" eyebrow="Mode" title="API Reference" description="Every command, emitter, element and setting, generated from the code." :meta="[{ icon: 'arrow_forward', label: 'Open API Reference' }]" :_click="reference"></e-cards-item>
					</div>
				</div>
			</div>
		`;
	}
});
