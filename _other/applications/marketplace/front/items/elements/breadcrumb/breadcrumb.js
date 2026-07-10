elements.ItemAdd({
	id: 'marketplace-breadcrumb',
	icon: 'chevron_right',
	name: 'Breadcrumb',
	description: 'Trail of links back to where you came from, last item is the current page.',
	category: 'Marketplace',
	author: 'OneType',
	metadata: { addon: 'marketplace' },
	config: {
		items: {
			type: 'array',
			value: [],
			each: {
				type: 'object',
				config: {
					label: { type: 'string' },
					onClick: { type: 'function' }
				}
			}
		}
	},
	render: function()
	{
		this.go = (entry) =>
		{
			entry.onClick && entry.onClick();
		};

		return `
			<nav class="box">
				<span ot-for="entry, index in items" :ot-key="entry.label" class="crumb">
					<button ot-if="entry.onClick" class="link" ot-click="go(entry)">{{ entry.label }}</button>
					<span ot-if="!entry.onClick" class="current">{{ entry.label }}</span>
					<i ot-if="index < items.length - 1">chevron_right</i>
				</span>
			</nav>
		`;
	}
});
