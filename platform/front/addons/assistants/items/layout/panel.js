onetype.AddonReady('layouts', (layouts) =>
{
	layouts.Item({
		id: 'assistants',
		active: false,
		zone: 'root',
		slot: 'right',
		render: `<e-assistant-chat></e-assistant-chat>`
	});
});
