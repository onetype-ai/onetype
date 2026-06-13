elements.ItemAdd({
	id: 'navbar',
	icon: 'toolbar',
	name: 'Navbar',
	description: 'Top toolbar with left, center and right positions. Addons inject items.',
	category: 'Navbar',
	author: 'OneType',
	metadata: { addon: 'navbar' },
	render: function()
	{
		this.positions = navbar.Fn('positions');

		const refresh = () =>
		{
			this.positions = navbar.Fn('positions');
		};

		this.On('@addon.item.added', (item) => item.addon.GetName() === 'navbar' && refresh());
		this.On('@addon.item.modified', (item) => item.addon.GetName() === 'navbar' && refresh());
		this.On('@addon.item.removed', (item) => item.addon.GetName() === 'navbar' && refresh());

		this.On('apps.switch', refresh);
		this.On('modes.switch', refresh);

		this.key = (item) =>
		{
			return item.id + ':' + JSON.stringify(item.data);
		};

		this.render = (item) =>
		{
			return navbar.ItemGet(item.id).Fn('render');
		};

		this.panel = (item) =>
		{
			const render = item.render;

			if(typeof render === 'function')
			{
				return render;
			}

			return () => render;
		};

		this.click = (item) =>
		{
			const { id, ...options } = item.type;

			if(id === 'popup')
			{
				$ot.float.modal(this.panel(item), options);

				return;
			}

			if(id === 'panel')
			{
				$ot.float.panel({ ...options, content: this.panel(item) });

				return;
			}

			if(item.onClick)
			{
				item.onClick();
			}
		};

		this.tooltip = (item) =>
		{
			if(!item.tooltip)
			{
				return null;
			}

			return { text: item.tooltip, position: { x: 'center', y: 'bottom' } };
		};

		const inner = `
			<i ot-if="item.icon">{{ item.icon }}</i>
			<span ot-if="item.label" class="label">{{ item.label }}</span>
		`;

		const items = (zone) => `
			<div ot-for="item in positions.${zone}" :ot-key="key(item)" :class="item.render && item.type.id === 'default' ? 'entry panel' : 'entry'">
				<div ot-if="item.render && item.type.id === 'default'" ot-node="render(item)"></div>
				<button ot-if="item.type.id === 'default' && !item.render" :class="'item' + (item.selected ? ' selected' : '')" :ot-tooltip="tooltip(item)" ot-click="click(item)">${inner}</button>
				<button ot-if="item.type.id === 'dropdown'" :class="'item' + (item.selected ? ' selected' : '')" :ot-tooltip="tooltip(item)" :ot-popup="panel(item)">${inner}</button>
				<button ot-if="item.type.id === 'popup' || item.type.id === 'panel'" :class="'item' + (item.selected ? ' selected' : '')" :ot-tooltip="tooltip(item)" ot-click="click(item)">${inner}</button>
			</div>
		`;

		return `
			<div class="box">
				<div class="zone left">
					<img class="logo" src="https://images.onetype.ai/96752e47-1bea-4313-025c-5b76dc174200/public" alt="OneType">
					${items('left')}
				</div>
				<div class="zone center">${items('center')}</div>
				<div class="zone right">${items('right')}</div>
			</div>
		`;
	}
});
