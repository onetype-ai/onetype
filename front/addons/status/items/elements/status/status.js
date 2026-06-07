onetype.AddonReady('elements', () =>
{
	elements.ItemAdd({
		id: 'status',
		icon: 'bottom_panel_open',
		name: 'Status',
		description: 'Bottom status bar with tabs that open an overlay panel.',
		category: 'Status',
		author: 'OneType',
		render: function()
		{
			this.left = [];
			this.right = [];
			this.active = null;

			const init = () =>
			{
				const app = onetype.StateGet('apps.active', 'builder');

				const items = Object.values(status.Items()).sort((a, b) => a.Get('order') - b.Get('order')).filter((item) =>
				{
					const apps = item.Get('app');

					return !apps.length || apps.includes(app);
				}).map((item) =>
				{
					return {id: item.Get('id'), icon: item.Get('icon'), label: item.Get('label'), align: item.Get('align'), tab: !!item.Get('render')};
				});

				this.left = items.filter((item) => item.align === 'left');
				this.right = items.filter((item) => item.align === 'right');
			};

			init();

			const callback = (item) =>
			{
				if(item.addon.GetName() === 'status')
				{
					init();
					this.Update();
				}
			};

			this.On('@addon.item.added', callback);
			this.On('@addon.item.modified', callback);
			this.On('@addon.item.removed', callback);

			this.On('@state.change', (key) =>
			{
				if(key === 'apps.active')
				{
					init();
					this.Update();
				}
			});

			this.classes = (item) =>
			{
				let classes = 'segment';

				if(item.tab)
				{
					classes += ' tab';
				}

				if(item.id === this.active)
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

				this.active = this.active === item.id ? null : item.id;
			};

			this.content = () =>
			{
				if(!this.active)
				{
					return document.createComment('');
				}

				return status.Render(this.active).Element;
			};

			this.close = () =>
			{
				this.active = null;
			};

			return `
				<div class="box">
					<div :class="active ? 'panel open' : 'panel'">
						<div class="head">
							<div class="title">{{ active }}</div>
							<div class="close" ot-click="close"><i>close</i></div>
						</div>
						<div class="content" ot-node="content()" :ot-key="active"></div>
					</div>
					<div class="bar">
						<div class="side left">
							<div ot-for="item in left">
								<div :class="classes(item)" ot-click="toggle(item)">
									<i ot-if="item.icon">{{ item.icon }}</i>
									<span ot-if="item.label">{{ item.label }}</span>
								</div>
							</div>
						</div>
						<div class="side right">
							<div ot-for="item in right">
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
});
