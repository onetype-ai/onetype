elements.ItemAdd({
	id: 'editor-toolbar',
	icon: 'toolbar',
	name: 'Editor Toolbar',
	description: 'Top toolbar for the editor.',
	category: 'Editor',
	author: 'OneType',
	config: {},
	render: function()
	{
		this.left = [];
		this.center = [];
		this.right = [];
		this.renders = {};

		const init = () =>
		{
			const items = Object.values(editor.toolbar.Items()).sort((a, b) => a.Get('order') - b.Get('order')).map((item) => item.data).filter(item => item.active);

			this.left = items.filter(item => item.position === 'left');
			this.center = items.filter(item => item.position === 'center');
			this.right = items.filter(item => item.position === 'right');

			this.renders = {};

			items.forEach(item =>
			{
				const render = editor.toolbar.Render(item.id);
				this.renders[item.id] = render.Element;
			});
		};

		const callback = (item) =>
		{
			if(item.addon.GetName() === 'editor.toolbar')
			{
				init();
			}
		};

		init();

		this.On('@addon.item.added', callback);
		this.On('@addon.item.modified', callback);
		this.On('@addon.item.removed', callback);

		this.get = (item) =>
		{
			return this.renders[item.id] || null;
		};

		this.cls = (item) =>
		{
			return item.raw ? 'item raw' : 'item';
		};

		return `
			<div class="holder">
				<div class="left">
					<div ot-for="item in left">
						<div :class="cls(item)">
							<div ot-node="get(item)"></div>
						</div>
					</div>
				</div>
				<div class="center">
					<div ot-for="item in center">
						<div :class="cls(item)">
							<div ot-node="get(item)"></div>
						</div>
					</div>
				</div>
				<div class="right">
					<div ot-for="item in right">
						<div :class="cls(item)">
							<div ot-node="get(item)"></div>
						</div>
					</div>
				</div>
			</div>
		`;
	}
});
