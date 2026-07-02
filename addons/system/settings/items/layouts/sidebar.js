onetype.AddonReady('ui.layouts', (layouts) =>
{
	layouts.Item({
		id: 'settings-sidebar',
		isActive: true,
		condition: { app: ['settings'] },
		zone: 'root',
		slot: 'left',
		render: function()
		{
			const data = ui.layouts.Fn('data');

			this.active = data.scope ? 'scope:' + data.scope : 'group:' + (data.group || 'apps');

			const build = () =>
			{
				const groups = settings.Fn('groups', '').map((group) =>
				{
					return { icon: group.icon, label: group.label, value: 'group:' + group.id };
				});

				const scopes = Object.values(settings.Fn('scopes')).map((scope) =>
				{
					return { icon: scope.icon || 'category', label: scope.label, value: 'scope:' + scope.id };
				});

				const items = [{ label: 'Addons', items: groups }];

				if(scopes.length)
				{
					items.push({ label: 'Scopes', items: scopes });
				}

				return items;
			};

			this.items = build();

			this.On('@addon.item.added', (item) => item.addon.GetName() === 'settings' && (this.items = build()));
			this.On('@addon.item.removed', (item) => item.addon.GetName() === 'settings' && (this.items = build()));
			this.On('settings.scope', () => { this.items = build(); });

			this.select = (event) =>
			{
				const value = event.value.value;
				const [kind, id] = value.split(':');

				this.active = value;

				$ot.ui.layouts.open('settings-content', kind === 'scope' ? { scope: id } : { group: id });
			};

			return `<e-navigation-sidebar :items="items" :active="active" :_click="select"></e-navigation-sidebar>`;
		}
	});
});
