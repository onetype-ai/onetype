elements.ItemAdd({
	id: 'extensions-detail',
	icon: 'extension',
	name: 'Extension Detail',
	description: 'The page of one extension: hero with install, and the overview of how it works.',
	category: 'Extensions',
	author: 'OneType',
	metadata: { addon: 'extensions' },
	config: {
		extension: {
			type: 'string',
			value: ''
		}
	},
	render: function()
	{
		const read = () =>
		{
			const item = extensions.ItemGet(this.extension);

			if(!item)
			{
				return null;
			}

			return {
				id: item.Get('id'),
				name: item.Get('name'),
				icon: item.Get('icon'),
				color: item.Get('color'),
				description: item.Get('description'),
				overview: item.Get('overview') || item.Get('description'),
				author: item.Get('author'),
				official: item.Get('official'),
				category: item.Get('category'),
				rating: item.Get('rating'),
				reviews: item.Get('reviews'),
				price: item.Get('price'),
				installed: item.Get('installed')
			};
		};

		this.Compute(() =>
		{
			this.entry = read();
		});

		this.On('extensions.install', (event) => event.id === this.extension && (this.entry = read()));
		this.On('extensions.uninstall', (event) => event.id === this.extension && (this.entry = read()));

		this.back = () =>
		{
			$ot.command('layouts:open', { id: 'extensions-content', data: { category: 'all' } });
		};

		this.toggle = () =>
		{
			$ot.command(this.entry.installed ? 'extensions:uninstall' : 'extensions:install', { id: this.entry.id });
		};

		return `
			<div class="box ot-scrollbar">
				<div class="ot-container-m">
					<button class="back" ot-click="back"><i>arrow_back</i><span>All extensions</span></button>
					<div ot-if="entry" class="hero">
						<div :class="'tile ' + entry.color"><i>{{ entry.icon }}</i></div>
						<div class="meta">
							<div class="name">{{ entry.name }} <i ot-if="entry.official" class="official">verified</i></div>
							<div class="author">{{ entry.author }} · {{ entry.category }}</div>
							<div class="facts">
								<span class="rating"><i>star</i>{{ entry.rating.toFixed(1) }} <em>({{ entry.reviews }} reviews)</em></span>
								<span class="price">{{ entry.price }}</span>
							</div>
						</div>
						<button :class="entry.installed ? 'have' : 'get'" ot-click="toggle">{{ entry.installed ? 'Uninstall' : 'Install' }}</button>
					</div>
					<div ot-if="entry" class="overview">
						<e-global-markdown :content="entry.overview"></e-global-markdown>
					</div>
					<div ot-if="!entry" class="empty">This extension does not exist.</div>
				</div>
			</div>
		`;
	}
});
