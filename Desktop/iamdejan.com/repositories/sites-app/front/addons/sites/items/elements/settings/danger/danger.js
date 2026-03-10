elements.ItemAdd({
	id: 'site-tab-danger',
	icon: 'warning',
	name: 'Site Danger',
	description: 'Danger zone settings tab for a site.',
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
		this.confirming = false;
		this.confirmText = '';
		this.deleting = false;
		this.error = '';

		this.confirm = () =>
		{
			this.confirming = true;
			this.confirmText = '';
		};

		this.dismiss = () =>
		{
			this.confirming = false;
			this.confirmText = '';
		};

		this.input = (event) =>
		{
			this.confirmText = event.target.value;
		};

		this.remove = async () =>
		{
			this.deleting = true;

			const result = await commands.Fn('api', 'sites:delete', {
				id: this.site.id
			});

			if(result.error)
			{
				this.deleting = false;
				this.error = result.error;
				return;
			}

			$ot.page('/');
		};

		return `
			<e-form-section title="Danger Zone" description="Irreversible actions." :variant="['border', 'bg-2']">
				<div slot="content">
					<e-form-field label="Delete this site" description="Permanently delete this site and all of its content. This action cannot be undone." :variant="['border-bottom']">
						<div slot="input" class="ot-flex ot-justify-end">
							<button ot-if="!confirming" ot-click="confirm" class="cancel">Delete</button>
							<div ot-if="confirming" class="confirm">
								<e-global-notice ot-if="error" icon="error" :text="error" :variant="['red']"></e-global-notice>
								<p class="confirm-text">Type <strong>DELETE</strong> to confirm.</p>
								<div class="confirm-actions">
									<input ot-input="input" class="confirm-input" type="text" placeholder="Type DELETE" :value="confirmText" />
									<button ot-click="remove" class="confirm-button" :disabled="deleting || confirmText.toUpperCase() !== 'DELETE'">
										<span ot-if="deleting">Deleting...</span>
										<span ot-if="!deleting">Confirm</span>
									</button>
									<button ot-click="dismiss" class="dismiss">Nevermind</button>
								</div>
							</div>
						</div>
					</e-form-field>
				</div>
			</e-form-section>
		`;
	}
});
