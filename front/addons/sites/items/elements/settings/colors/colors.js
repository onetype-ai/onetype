elements.ItemAdd({
	id: 'site-tab-colors',
	icon: 'palette',
	name: 'Site Colors',
	description: 'Color settings for a site.',
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
		this.saved = false;

		this.onSuccess = () =>
		{
			this.saved = true;

			setTimeout(() => { this.saved = false; }, 3000);
		};

		return `
			<div ot-command-submit command="sites:update" bind="form" :api="true" :reset="false" :data="site" :_success="onSuccess">
				<input type="hidden" name="id" :value="site.id" />
				<e-form-section title="Colors" description="Colors and visual identity for your site." :variant="['border', 'bg-2']">
					<div slot="content">
						<div ot-if="form.error" class="ot-p-m"><e-global-notice icon="error" :text="form.error" :variant="['red']"></e-global-notice></div>
						<div ot-if="saved" class="ot-p-m"><e-global-notice icon="check_circle" text="Settings saved." :variant="['green']"></e-global-notice></div>
						<e-form-field label="Brand" description="Primary brand color used for buttons, links and accents across your site." :variant="['border-bottom']">
							<e-form-color slot="input" name="color" value="#E27055" :variant="['bg-3', 'border', 'size-m']"></e-form-color>
						</e-form-field>
						<e-form-field label="Background" description="The main background color for your entire site. Applied to all pages." :variant="['border-bottom']">
							<e-form-color slot="input" name="background" value="#1D1D1F" :variant="['bg-3', 'border', 'size-m']"></e-form-color>
						</e-form-field>
						<e-form-field label="Text Primary" description="Main text color used for headings and body content." :variant="['border-bottom']">
							<e-form-color slot="input" name="text_primary" value="#E1E4E8" :variant="['bg-3', 'border', 'size-m']"></e-form-color>
						</e-form-field>
						<e-form-field label="Text Secondary" description="Secondary text color for descriptions, captions and muted content." :variant="['border-bottom']">
							<e-form-color slot="input" name="text_secondary" value="#9FA5B1" :variant="['bg-3', 'border', 'size-m']"></e-form-color>
						</e-form-field>
						<div class="ot-p-m ot-flex ot-justify-end">
							<e-form-button text="Save" icon="save" :variant="['brand', 'size-m']" :loading="form.loading" type="submit"></e-form-button>
						</div>
					</div>
				</e-form-section>
			</div>
		`;
	}
});
