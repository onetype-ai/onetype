elements.ItemAdd({
	id: 'bar',
	icon: 'apps',
	name: 'Apps Rail',
	description: 'Vertical rail launcher for apps.',
	category: 'Apps',
	author: 'OneType',
	metadata: { addon: 'apps' },
	render: function()
	{
		const refresh = () =>
		{
			const list = apps.Fn('list');

			this.top = list.filter((app) => app.position === 'top');
			this.bottom = list.filter((app) => app.position === 'bottom');
		};

		refresh();

		this.On('@addon.item.added', (item) => item.addon.GetName() === 'apps' && refresh());
		this.On('@addon.item.modified', (item) => item.addon.GetName() === 'apps' && refresh());
		this.On('@addon.item.removed', (item) => item.addon.GetName() === 'apps' && refresh());

		this.On('apps.switch', refresh);

		this.select = (app) =>
		{
			$ot.command('apps:switch', {id: app.id});
		};

		return `
			<div class="box">
				<div class="apps top">
					<div ot-for="app in top" :ot-key="app.id" :class="app.active ? 'app active' : 'app'" :ot-tooltip="{ text: app.label, position: { x: 'right', y: 'center' } }" ot-click="select(app)">
						<span class="indicator"></span>
						<i>{{ app.icon }}</i>
					</div>
				</div>
				<div class="apps bottom">
					<div ot-for="app in bottom" :ot-key="app.id" :class="app.active ? 'app active' : 'app'" :ot-tooltip="{ text: app.label, position: { x: 'right', y: 'center' } }" ot-click="select(app)">
						<span class="indicator"></span>
						<i>{{ app.icon }}</i>
					</div>
				</div>
			</div>
		`;
	}
});
