onetype.AddonReady('ui.layouts', (layouts) =>
{
	layouts.Item({
		id: 'marketplace-extension-single',
		isActive: true,
		condition: { app: ['marketplace'], mode: ['extensions'], callback: function() { return !!this.slug; } },
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
				$ot.ui.layouts.open('marketplace-extensions', { slug: '' });
			};

			this.Compute(() =>
			{
				this.entry = marketplace.Fn('extensions').find((entry) => entry.id === this.slug) || null;

				this.crumbs = [
					{ label: 'Extensions', onClick: this.back },
					{ label: this.entry ? this.entry.name : this.slug }
				];
			});

			this.toggle = ({ extension }) =>
			{
				console.log('toggle extension', extension.id);
			};

			return `
				<div class="ot-container-m ot-py-l">
					<div class="ot-mb-l"><e-marketplace-breadcrumb :items="crumbs"></e-marketplace-breadcrumb></div>
					<e-marketplace-extension-hero ot-if="entry" :extension="entry" :_toggle="toggle"></e-marketplace-extension-hero>
					<div ot-if="entry" class="ot-pt-l">
						<e-global-markdown :content="entry.description"></e-global-markdown>
					</div>
					<p ot-if="!entry" class="ot-mt-l">This extension does not exist.</p>
				</div>
			`;
		}
	});
});
