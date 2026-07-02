onetype.AddonReady('ui.layouts', (layouts) =>
{
	layouts.Item({
		id: 'assistants',
		isActive: false,
		zone: 'root',
		slot: 'right',
		render: `<e-assistant-chat></e-assistant-chat>`
	});
});
