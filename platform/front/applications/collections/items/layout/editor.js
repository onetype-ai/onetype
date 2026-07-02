onetype.AddonReady('layouts', (layouts) =>
{
	layouts.Item({
		id: 'collections-editor',
		active: true,
		condition: { app: ['collections'], mode: ['collections-preview'] },
		zone: 'root',
		slot: 'right',
		render: `<e-collections-editor></e-collections-editor>`
	});
});
