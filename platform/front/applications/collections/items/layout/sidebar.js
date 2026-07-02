onetype.AddonReady('layouts', (layouts) =>
{
	layouts.Item({
		id: 'collections-sidebar',
		active: true,
		condition: { app: ['collections'], mode: ['collections-preview', 'collections-build', 'collections-export', 'collections-import', 'collections-history'] },
		zone: 'root',
		slot: 'left',
		render: function()
		{
			this.groups = collections.Fn('groups');
			this.active = $ot.settings.get('collections.active', '');

			const refresh = () =>
			{
				this.groups = collections.Fn('groups');
				this.active = $ot.settings.get('collections.active', '');
			};

			this.On('@addon.item.added', (item) => item.addon.GetName() === 'collections' && refresh());
			this.On('@addon.item.modified', (item) => item.addon.GetName() === 'collections' && refresh());
			this.On('@addon.item.removed', (item) => item.addon.GetName() === 'collections' && refresh());

			this.On('collections.select', refresh);

			this.select = (event) =>
			{
				$ot.command('collections:select', { id: event.value.value });
			};

			return `<e-navigation-sidebar :groups="groups" :active="active" :_click="select"></e-navigation-sidebar>`;
		}
	});
});
