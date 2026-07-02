onetype.AddonReady('layouts', (layouts) =>
{
	layouts.Item({
		id: 'documentation-sidebar',
		active: true,
		condition: { app: ['documentation'] },
		zone: 'root',
		slot: 'left',
		render: function()
		{
			const content = layouts.ItemGet('documentation-content');

			this.active = (content && content.Get('data').addon) || 'apps';

			const build = () =>
			{
				const groups = {};

				Object.values(documentation.Items()).sort((a, b) => a.Get('order') - b.Get('order')).forEach((item) =>
				{
					const group = item.Get('group');

					if(!groups[group])
					{
						groups[group] = {title: group, items: []};
					}

					groups[group].items.push({icon: item.Get('icon'), label: item.Get('label'), value: item.Get('addon')});
				});

				return Object.values(groups);
			};

			this.groups = build();

			this.On('@addon.item.added', (item) => item.addon.GetName() === 'documentation' && (this.groups = build()));

			this.select = (event) =>
			{
				const value = event.value.value;

				this.active = value;

				$ot.command('layouts:open', {id: 'documentation-content', data: {addon: value}});
			};

			return `<e-navigation-sidebar :groups="groups" :active="active" :_click="select"></e-navigation-sidebar>`;
		}
	});
});
