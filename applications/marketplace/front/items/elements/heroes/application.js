elements.ItemAdd({
	id: 'marketplace-application-hero',
	icon: 'apps',
	name: 'Application Hero',
	description: 'The top of an application page: tile, name, slug and the install button.',
	category: 'Marketplace',
	author: 'OneType',
	metadata: { addon: 'marketplace' },
	config: {
		application: {
			type: 'object',
			value: {}
		},
		_toggle: {
			type: 'function'
		}
	},
	render: function()
	{
		this.Compute(() =>
		{
			this.entry = this.application;
		});

		this.toggle = () =>
		{
			this._toggle && this._toggle({ application: this.entry });
		};

		return `
			<div class="box">
				<div class="tile" :style="'background: ' + entry.color + '1a; color: ' + entry.color"><i>{{ entry.icon }}</i></div>
				<div class="meta">
					<div class="name">{{ entry.name }} <i ot-if="entry.is_global" class="official">verified</i></div>
					<div class="slug">{{ entry.slug }}</div>
				</div>
				<button :class="entry.installed ? 'have' : 'get'" ot-click="toggle">{{ entry.installed ? 'Uninstall' : 'Install' }}</button>
			</div>
		`;
	}
});
