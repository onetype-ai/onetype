elements.ItemAdd({
	id: 'documentation-tabs',
	icon: 'tab',
	name: 'Documentation Tabs',
	description: 'Tab bar for an inspected addon.',
	category: 'Documentation',
	author: 'OneType',
	config: {
		inspect: {
			type: 'object',
			value: {}
		},
		active: {
			type: 'string',
			value: ''
		},
		_change: {
			type: 'function'
		}
	},
	render: function()
	{
		const icons = {overview: 'info', fields: 'data_object', items: 'list', functions: 'function', store: 'database', elements: 'widgets', commands: 'terminal', pipelines: 'account_tree', events: 'bolt'};
		const order = ['overview', 'fields', 'items', 'functions', 'store', 'elements', 'commands', 'pipelines', 'events'];

		this.Compute(() =>
		{
			this.tabs = order.filter((tab) =>
			{
				return tab === 'overview' ? this.inspect.overview : (this.inspect[tab] || []).length;
			}).map((tab) =>
			{
				return {id: tab, label: tab.charAt(0).toUpperCase() + tab.slice(1), icon: icons[tab], count: tab === 'overview' ? null : this.inspect[tab].length};
			});
		});

		this.select = (event) =>
		{
			this._change && this._change(event.value);
		};

		return /* html */ `
			<e-navigation-tabs :items="tabs" :active="active" tone="segmented" background="bg-2" :variant="['border']" :_change="select"></e-navigation-tabs>
		`;
	}
});
