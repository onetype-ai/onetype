elements.ItemAdd({
	id: 'status',
	icon: 'bottom_panel_open',
	name: 'Status',
	description: 'Bottom status bar. Plain segments show state, tabs open their panel through layouts.',
	category: 'Status',
	author: 'OneType',
	metadata: { addon: 'status' },
	render: function()
	{
		const refresh = () =>
		{
			const list = status.Fn('list');

			this.left = list.filter((item) => item.align === 'left');
			this.right = list.filter((item) => item.align === 'right');
		};

		refresh();

		this.On('@addon.item.added', (item) => item.addon.GetName() === 'status' && refresh());
		this.On('@addon.item.modified', (item) => item.addon.GetName() === 'status' && refresh());
		this.On('@addon.item.removed', (item) => item.addon.GetName() === 'status' && refresh());

		this.On('apps.switch', refresh);
		this.On('modes.switch', refresh);
		this.On('layouts.open', refresh);
		this.On('layouts.close', refresh);

		this.classes = (item) =>
		{
			let classes = 'segment';

			if(item.tab)
			{
				classes += ' tab';
			}

			if(item.open)
			{
				classes += ' open';
			}

			return classes;
		};

		this.toggle = (item) =>
		{
			if(!item.tab)
			{
				return;
			}

			if(item.open)
			{
				$ot.command('layouts:close', { id: 'status-panel' });
			}
			else
			{
				$ot.command('layouts:open', { id: 'status-panel', data: { tab: item.id } });
			}
		};

		return `
			<div class="box">
				<div class="bar">
					<div class="side left">
						<div ot-for="item in left" :ot-key="item.id">
							<div :class="classes(item)" ot-click="toggle(item)">
								<i ot-if="item.icon">{{ item.icon }}</i>
								<span ot-if="item.label">{{ item.label }}</span>
							</div>
						</div>
					</div>
					<div class="side right">
						<div ot-for="item in right" :ot-key="item.id">
							<div :class="classes(item)" ot-click="toggle(item)">
								<i ot-if="item.icon">{{ item.icon }}</i>
								<span ot-if="item.label">{{ item.label }}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		`;
	}
});
