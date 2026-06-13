elements.ItemAdd({
	id: 'extensions-store',
	icon: 'extension',
	name: 'Extensions Store',
	description: 'The extension marketplace: featured and trending rows, category grids, search and one click install.',
	category: 'Extensions',
	author: 'OneType',
	metadata: { addon: 'extensions' },
	config: {
		category: {
			type: 'string',
			value: 'all'
		}
	},
	render: function()
	{
		this.query = '';

		const refresh = () =>
		{
			if(this.query)
			{
				this.sections = [{ id: 'results', title: 'Results', items: extensions.Fn('list', { query: this.query }) }];

				return;
			}

			if(this.category !== 'all')
			{
				const names = { featured: 'Featured', trending: 'Trending', installed: 'Installed' };

				this.sections = [{ id: this.category, title: names[this.category] || this.category, items: extensions.Fn('list', { category: this.category }) }];

				return;
			}

			this.sections = [
				{ id: 'featured', title: 'Featured', items: extensions.Fn('list', { category: 'featured' }) },
				{ id: 'trending', title: 'Trending now', items: extensions.Fn('list', { category: 'trending' }) },
				{ id: 'all', title: 'All extensions', items: extensions.Fn('list', {}) }
			].filter((section) => section.items.length);
		};

		this.Compute(refresh);

		this.On('extensions.install', refresh);
		this.On('extensions.uninstall', refresh);
		this.On('@addon.item.added', (item) => item.addon.GetName() === 'extensions' && refresh());

		this.input = ({ value }) =>
		{
			this.query = value;
			refresh();
		};

		this.open = ({ extension }) =>
		{
			$ot.command('layouts:open', { id: 'extensions-content', data: { category: this.category, extension: extension.id } });
		};

		this.toggle = ({ extension }) =>
		{
			$ot.command(extension.installed ? 'extensions:uninstall' : 'extensions:install', { id: extension.id });
		};

		return `
			<div class="box ot-scrollbar">
				<div class="ot-container-l">
					<div class="hero">
						<e-global-heading title="Extend everything." description="Apps, agents, panels, commands. If the editor does it, an extension brought it."></e-global-heading>
						<div class="search">
							<e-form-input :value="query" icon="search" placeholder="Search extensions..." :_input="input"></e-form-input>
						</div>
					</div>
					<div ot-for="section in sections" :ot-key="section.id" class="section">
						<h2>{{ section.title }}</h2>
						<div class="grid ot-grid-auto-m">
							<e-extensions-card ot-for="entry in section.items" :ot-key="entry.id + ':' + entry.installed" :extension="entry" :_open="open" :_toggle="toggle"></e-extensions-card>
						</div>
					</div>
					<div ot-if="!sections.length" class="empty">Nothing matches your search.</div>
				</div>
			</div>
		`;
	}
});
