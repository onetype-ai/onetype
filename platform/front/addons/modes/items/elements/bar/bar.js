elements.ItemAdd({
	id: 'modes-bar',
	icon: 'layout',
	name: 'Modes Bar',
	description: 'Floating bar to switch modes.',
	category: 'Modes',
	author: 'OneType',
	metadata: { addon: 'modes' },
	render: function()
	{
		const refresh = () =>
		{
			this.modes = modes.Fn('list');
		};

		refresh();

		this.On('@addon.item.added', (item) => item.addon.GetName() === 'modes' && refresh());
		this.On('@addon.item.modified', (item) => item.addon.GetName() === 'modes' && refresh());
		this.On('@addon.item.removed', (item) => item.addon.GetName() === 'modes' && refresh());

		this.On('modes.switch', refresh);
		this.On('apps.switch', refresh);

		this.classes = (mode) =>
		{
			return mode.active ? 'mode active' : 'mode';
		};

		this.select = (mode) =>
		{
			$ot.command('modes:switch', {id: mode.id});
		};

		return `
			<div class="holder">
				<div ot-for="mode in modes" :ot-key="mode.id" :class="classes(mode)" :ot-tooltip="{ text: mode.label, position: { x: 'center', y: 'top' } }" ot-click="select(mode)">
					<i>{{ mode.icon }}</i>
				</div>
			</div>
		`;
	}
});
