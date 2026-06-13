onetype.AddonReady('layouts', (layouts) =>
{
	layouts.Item({
		id: 'extensions-content',
		active: true,
		app: ['extensions'],
		zone: 'root',
		slot: 'center',
		config: {
			category: {
				type: 'string',
				value: 'all'
			},
			extension: {
				type: 'string',
				value: ''
			}
		},
		render: function()
		{
			if(this.extension)
			{
				return `<e-extensions-detail :extension="extension"></e-extensions-detail>`;
			}

			return `<e-extensions-store :category="category"></e-extensions-store>`;
		}
	});
});
