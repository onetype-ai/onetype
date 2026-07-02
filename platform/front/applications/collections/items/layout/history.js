onetype.AddonReady('layouts', (layouts) =>
{
	layouts.Item({
		id: 'collections-history',
		active: true,
		condition: { app: ['collections'], mode: ['collections-history'] },
		zone: 'root',
		slot: 'center',
		render: `<e-collections-history></e-collections-history>`
	});
});
