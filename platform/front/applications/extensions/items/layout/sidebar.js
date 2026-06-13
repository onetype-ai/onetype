onetype.AddonReady('layouts', (layouts) =>
{
	layouts.Item({
		id: 'extensions-sidebar',
		active: true,
		app: ['extensions'],
		zone: 'root',
		slot: 'left',
		render: function()
		{
			const content = layouts.ItemGet('extensions-content');

			this.active = (content && content.Get('data').category) || 'all';

			const build = () =>
			{
				const browse = [
					{ icon: 'apps', label: 'All extensions', value: 'all' },
					{ icon: 'star', label: 'Featured', value: 'featured' },
					{ icon: 'trending_up', label: 'Trending', value: 'trending' },
					{ icon: 'check_circle', label: 'Installed', value: 'installed' }
				];

				const categories = extensions.Fn('categories').map((entry) =>
				{
					return { icon: 'folder', label: entry.category, value: entry.category };
				});

				return [
					{ title: 'Browse', items: browse },
					{ title: 'Categories', items: categories }
				];
			};

			this.groups = build();

			this.On('@addon.item.added', (item) => item.addon.GetName() === 'extensions' && (this.groups = build()));

			this.select = (event) =>
			{
				const value = event.value.value;

				this.active = value;

				$ot.command('layouts:open', { id: 'extensions-content', data: { category: value } });
			};

			return `<e-navigation-sidebar :groups="groups" :active="active" :_click="select"></e-navigation-sidebar>`;
		}
	});
});
