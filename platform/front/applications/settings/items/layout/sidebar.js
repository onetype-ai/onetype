onetype.AddonReady('layouts', (layouts) =>
{
	layouts.Item({
		id: 'settings-sidebar',
		active: true,
		app: ['settings'],
		zone: 'root',
		slot: 'left',
		render: function()
		{
			const content = layouts.ItemGet('settings-content');
			const data = content ? content.Get('data') : {};

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

				const sections = [{ title: 'Addons', items: groups }];

				if(scopes.length)
				{
					sections.push({ title: 'Scopes', items: scopes });
				}

				return sections;
			};

			this.groups = build();

			this.On('@addon.item.added', (item) => item.addon.GetName() === 'settings' && (this.groups = build()));
			this.On('@addon.item.removed', (item) => item.addon.GetName() === 'settings' && (this.groups = build()));
			this.On('settings.scope', () => { this.groups = build(); });

			this.select = (event) =>
			{
				const value = event.value.value;
				const [kind, id] = value.split(':');

				this.active = value;

				$ot.command('layouts:open', { id: 'settings-content', data: kind === 'scope' ? { scope: id } : { group: id } });
			};

			return `<e-navigation-sidebar :groups="groups" :active="active" :_click="select"></e-navigation-sidebar>`;
		}
	});
});
