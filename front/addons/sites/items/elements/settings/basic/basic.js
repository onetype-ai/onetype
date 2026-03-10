elements.ItemAdd({
	id: 'site-tab-basic',
	icon: 'settings',
	name: 'Site Basic',
	description: 'Basic settings tab for a site.',
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
				<e-form-section title="General" description="Basic information about your site." :variant="['border', 'bg-2']">
					<div slot="content">
						<div ot-if="form.error" class="ot-p-m"><e-global-notice icon="error" :text="form.error" variant="red"></e-global-notice></div>
						<div ot-if="saved" class="ot-p-m"><e-global-notice icon="check_circle" text="Settings saved." variant="green"></e-global-notice></div>
						<e-form-field label="Name" description="The public name of your site. Shown in the browser tab and search results." :variant="['border-bottom']">
							<e-form-input slot="input" name="name" placeholder="Site name" :variant="['bg-3', 'border']"></e-form-input>
						</e-form-field>
						<e-form-field label="Description" description="A short summary of what your site is about. Used for SEO and social sharing previews." :variant="['border-bottom']">
							<e-form-textarea slot="input" name="description" placeholder="Describe your site..." :variant="['bg-3', 'border']" :rows="4"></e-form-textarea>
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
