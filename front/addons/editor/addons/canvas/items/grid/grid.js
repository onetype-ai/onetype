elements.ItemAdd({
	id: 'editor-grid',
	icon: 'grid_on',
	name: 'Editor Grid',
	description: 'Background mesh grid for the canvas.',
	category: 'Editor',
	author: 'OneType',
	config: {
		visible: {
			type: 'boolean',
			value: true
		},
		size: {
			type: 'number',
			value: 20
		},
		zoom: {
			type: 'number',
			value: 100
		}
	},
	render: function()
	{
		this.style = () =>
		{
			const s = this.size * (this.zoom / 100);

			return 'background-size: ' + s + 'px ' + s + 'px, ' + (s * 5) + 'px ' + (s * 5) + 'px;';
		};

		return `
			<div ot-if="visible" class="holder" :style="style()"></div>
		`;
	}
});
