onetype.AddonReady('ui.layouts', (layouts) =>
{
	layouts.Item({
		id: 'marketplace-applications',
		isActive: true,
		condition: { app: ['marketplace'], mode: ['applications'], callback: function() { return !this.slug; } },
		zone: 'root',
		slot: 'center',
		render: function()
		{
			const refresh = () =>
			{
				this.items = marketplace.Fn('applications');
			};

			this.Compute(refresh);

			this.On('projects.open', refresh);
			this.On('projects.close', refresh);
			this.On('@addon.item.added', (item) => item.addon.GetName() === 'applications' && refresh());

			this.open = ({ application }) =>
			{
				$ot.ui.layouts.open('marketplace-application-single', { slug: application.slug });
			};

			this.toggle = ({ application }) =>
			{
				if(application.installed)
				{
					return $ot.projects.applications.uninstall(application.slug);
				}

				$ot.projects.applications.install(application.slug);
			};

			return `
				<div class="ot-container-l ot-py-l">
					<e-global-heading
						eyebrow="Marketplace"
						icon="apps"
						title="Applications"
						description="Browse and install applications onto your project."
						element="h1"
						size="m">
					</e-global-heading>
					<div class="ot-grid-auto-l ot-mt-l">
						<e-marketplace-application-card ot-for="entry in items" :ot-key="entry.slug + ':' + entry.installed" :application="entry" :_open="open" :_toggle="toggle"></e-marketplace-application-card>
					</div>
					<p ot-if="!items.length" class="ot-mt-l">No applications available.</p>
				</div>
			`;
		}
	});
});
