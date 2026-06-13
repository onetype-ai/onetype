elements.ItemAdd({
	id: 'layout',
	icon: 'layout',
	name: 'Layout',
	description: 'Workspace shell with top, left, right, bottom and center slots.',
	category: 'Layout',
	author: 'OneType',
	metadata: { addon: 'layouts' },
	config: {
		zone: {
			type: 'string',
			value: 'root'
		}
	},
	render: function()
	{
		this.slots = layouts.Fn('slots', this.zone);

		const refresh = () =>
		{
			this.slots = layouts.Fn('slots', this.zone);
		};

		this.On('@addon.item.added', (item) => item.addon.GetName() === 'layouts' && refresh());
		this.On('@addon.item.removed', (item) => item.addon.GetName() === 'layouts' && refresh());

		this.On('layouts.open', refresh);
		this.On('layouts.close', refresh);
		this.On('apps.switch', refresh);
		this.On('modes.switch', refresh);

		this.render = (item) =>
		{
			return layouts.ItemGet(item.id).Fn('render');
		};

		this.key = (item) =>
		{
			return item.id + ':' + JSON.stringify(item.data);
		};

		return `
			<div :class="'box ' + zone">
				<div ot-if="slots.left.length" class="slot left">
					<div ot-for="item in slots.left" ot-node="render(item)" :ot-key="key(item)"></div>
				</div>
				<div class="middle">
					<div ot-if="slots.top.length" class="slot top">
						<div ot-for="item in slots.top" ot-node="render(item)" :ot-key="key(item)"></div>
					</div>
					<div class="slot center">
						<div ot-for="item in slots.center" ot-node="render(item)" :ot-key="key(item)"></div>
					</div>
					<div ot-if="slots.bottom.length" class="slot bottom">
						<div ot-for="item in slots.bottom" ot-node="render(item)" :ot-key="key(item)"></div>
					</div>
				</div>
				<div ot-if="slots.right.length" class="slot right">
					<div ot-for="item in slots.right" ot-node="render(item)" :ot-key="key(item)"></div>
				</div>
			</div>
		`;
	}
});
