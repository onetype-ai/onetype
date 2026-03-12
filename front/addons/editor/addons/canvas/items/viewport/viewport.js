elements.ItemAdd({
	id: 'editor-viewport',
	icon: 'crop_free',
	name: 'Editor Viewport',
	description: 'Viewport frame that renders site content.',
	category: 'Editor',
	author: 'OneType',
	config: {
		width: {
			type: 'number',
			value: 1440
		},
		zoom: {
			type: 'number',
			value: 100
		},
		label: {
			type: 'string',
			value: ''
		}
	},
	render: function()
	{
		this.style = () =>
		{
			const scale = this.zoom / 100;

			return 'width: ' + this.width + 'px; transform: scale(' + scale + '); transform-origin: top center;';
		};

		return `
			<div class="holder">
				<span ot-if="label" class="label">{{ label }} — {{ width }}px</span>
				<div class="frame" :style="style()">
					<div class="body">
						<slot name="content"></slot>
					</div>
				</div>
			</div>
		`;
	}
});
