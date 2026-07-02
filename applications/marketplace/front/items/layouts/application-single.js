onetype.AddonReady('ui.layouts', (layouts) =>
{
	layouts.Item({
		id: 'marketplace-application-single',
		isActive: true,
		condition: { app: ['marketplace'], mode: ['applications'], callback: function() { return !!this.slug; } },
		zone: 'root',
		slot: 'center',
		config: {
			slug: {
				type: 'string',
				value: ''
			}
		},
		render: function()
		{
			this.back = () =>
			{
				$ot.ui.layouts.open('marketplace-applications', { slug: '' });
			};

			this.Compute(() =>
			{
				this.entry = marketplace.Fn('applications').find((entry) => entry.slug === this.slug) || null;

				this.crumbs = [
					{ label: 'Applications', onClick: this.back },
					{ label: this.entry ? this.entry.name : this.slug }
				];
			});

			this.toggle = ({ application }) =>
			{
				if(application.installed)
				{
					return $ot.projects.applications.uninstall(application.slug);
				}

				$ot.projects.applications.install(application.slug);
			};

			return `
				<div class="ot-container-m ot-py-l">
					<div class="ot-mb-l"><e-marketplace-breadcrumb :items="crumbs"></e-marketplace-breadcrumb></div>
					<e-marketplace-application-hero ot-if="entry" :application="entry" :_toggle="toggle"></e-marketplace-application-hero>
					<div ot-if="entry" class="ot-pt-l">
						<e-global-markdown :content="entry.description"></e-global-markdown>
					</div>
					<p ot-if="!entry" class="ot-mt-l">This application does not exist.</p>
				</div>
			`;
		}
	});
});
