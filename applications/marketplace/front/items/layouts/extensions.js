onetype.AddonReady('ui.layouts', (layouts) =>
{
	layouts.Item({
		id: 'marketplace-extensions',
		isActive: true,
		condition: { app: ['marketplace'], mode: ['extensions'], callback: function() { return !this.slug; } },
		zone: 'root',
		slot: 'center',
		render: function()
		{
			const refresh = () =>
			{
				this.items = marketplace.Fn('extensions');
			};

			this.Compute(refresh);

			this.open = ({ extension }) =>
			{
				$ot.ui.layouts.open('marketplace-extension-single', { slug: extension.id });
			};

			this.toggle = ({ extension }) =>
			{
				console.log('toggle extension', extension.id);
			};

			return `
				<div class="ot-container-l ot-py-l">
					<e-global-heading
						eyebrow="Marketplace"
						icon="extension"
						title="Extensions"
						description="Browse and install extensions that add features to the editor."
						element="h1"
						size="m">
					</e-global-heading>
					<div class="ot-grid-auto-l ot-mt-l">
						<e-marketplace-extension-card ot-for="entry in items" :ot-key="entry.id + ':' + entry.installed" :extension="entry" :_open="open" :_toggle="toggle"></e-marketplace-extension-card>
					</div>
					<p ot-if="!items.length" class="ot-mt-l">No extensions available.</p>
				</div>
			`;
		}
	});
});
