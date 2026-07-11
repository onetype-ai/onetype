onetype.AddonReady('ui.layouts', (layouts) =>
{
	layouts.Item({
		id: 'website-site',
		isActive: true,
		condition: { app: ['website'] },
		zone: 'root',
		slot: 'center',
		render: function()
		{
			return `
				<div class="ot-flex-vertical ot-flex-1 ot-scrollbar">
					<e-website-landing></e-website-landing>
				</div>
			`;
		}
	});
});
