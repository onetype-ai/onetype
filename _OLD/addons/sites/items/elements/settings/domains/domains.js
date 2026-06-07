elements.ItemAdd({
	id: 'site-tab-domains',
	icon: 'language',
	name: 'Site Domains',
	description: 'Domain settings tab for a site.',
	category: 'Sites',
	author: 'OneType',
	config: {
		site: {
			type: 'object',
			value: {}
		}
	},
	render: function()
	{
		return `
			<div class="sections">
				<e-form-section title="Domains" description="Connect a custom domain to your site." :variant="['border', 'bg-2']">
					<div slot="content">
						<div class="ot-p-m">
							<e-status-empty icon="language" title="No domains" description="Custom domain configuration is not available yet."></e-status-empty>
						</div>
					</div>
				</e-form-section>
			</div>
		`;
	}
});
