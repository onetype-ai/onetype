elements.ItemAdd({
	id: 'sites-card',
	icon: 'language',
	name: 'Site Card',
	description: 'Card for displaying a site in the dashboard grid.',
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
		this.domain = this.site.domains && this.site.domains.length ? this.site.domains[0] : null;
		this.date = this.site.updated_at ? new Date(this.site.updated_at).toLocaleDateString() : '';
		this.fontNames = this.site.fonts ? this.site.fonts.map(font => font.name).join(', ') : '';
		this.extensions = this.site.extensions ? this.site.extensions.length : 0;

		return `
			<a class="holder" :href="'/site/' + site.id">
				<div class="preview" :style="site.color ? '--preview-color: ' + site.color : ''">
					<div ot-if="site.color" class="color"></div>
					<i class="material-symbols-rounded">language</i>
				</div>
				<div class="body">
					<div class="head">
						<h3 class="title">{{ site.name }}</h3>
						<span ot-if="site.is_theme" class="badge theme">Theme</span>
					</div>
					<div class="meta">
						<span ot-if="site.category" class="tag"><i>{{ site.category.icon }}</i> {{ site.category.name }}</span>
						<span ot-if="fontNames" class="tag"><i>text_fields</i> {{ fontNames }}</span>
						<span ot-if="domain" class="tag"><i>link</i> {{ domain }}</span>
						<span ot-if="extensions" class="tag"><i>extension</i> {{ extensions }}</span>
						<span ot-if="!site.category && !fontNames && !domain && !extensions && date" class="tag"><i>schedule</i> {{ date }}</span>
					</div>
				</div>
			</a>
		`;
	}
});
