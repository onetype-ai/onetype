onetype.AddonReady('ui.layouts', (layouts) =>
{
	layouts.Item({
		id: 'settings-content',
		isActive: true,
		condition: { app: ['settings'] },
		zone: 'root',
		slot: 'center',
		config: {
			group: {
				type: 'string',
				value: '',
				description: 'Settings group shown in the content area. Empty falls back to the first group.'
			},
			scope: {
				type: 'string',
				value: '',
				description: 'Settings scope shown instead of a group, like user.'
			}
		},
		render: function()
		{
			return /* html */ `<e-settings-content :group="group" :scope="scope"></e-settings-content>`;
		}
	});
});
