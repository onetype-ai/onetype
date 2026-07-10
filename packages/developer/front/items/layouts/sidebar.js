onetype.AddonReady('ui.layouts', (layouts) =>
{
	layouts.Item({
		id: 'developer-sidebar',
		isActive: true,
		condition: { app: ['developer'], mode: ['elements'] },
		zone: 'root',
		slot: 'left',
		render: function()
		{
			this.Compute(() =>
			{
				this.tree = developer.Fn('list').map((group) => ({
					label: group.category,
					items: group.items.map((item) => ({ icon: item.icon, label: item.name, value: item.id }))
				}));
			});

			this.pick = ({ value }) =>
			{
				value.value && $ot.ui.layouts.data({ developerElement: value.value, developerProps: {} });
			};

			return `<e-navigation-sidebar title="Elements" :search="true" :items="tree" :active="developerElement" :_click="pick"></e-navigation-sidebar>`;
		}
	});
});
