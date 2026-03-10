elements.ItemAdd({
	id: 'editor-ruler',
	icon: 'straighten',
	name: 'Editor Ruler',
	description: 'Pixel ruler for the canvas.',
	category: 'Editor',
	author: 'OneType',
	config: {
		visible: {
			type: 'boolean',
			value: true
		},
		direction: {
			type: 'string',
			value: 'horizontal',
			options: ['horizontal', 'vertical']
		},
		zoom: {
			type: 'number',
			value: 100
		},
		scroll: {
			type: 'number',
			value: 0
		},
	},
	render: function()
	{
		this.marks = () =>
		{
			const scale = this.zoom / 100;
			const step = scale >= 0.5 ? 100 : 200;
			const count = Math.ceil(3000 / step);
			const result = [];

			for(let i = 0; i <= count; i++)
			{
				result.push({
					position: (i * step * scale) - (this.scroll * scale),
					label: i * step
				});
			}

			return result;
		};

		return `
			<div ot-if="visible" :class="'holder ' + direction">
				<div ot-for="mark in marks()" class="mark" :style="(direction === 'horizontal' ? 'left' : 'top') + ': ' + mark.position + 'px'">
					<span class="label">{{ mark.label }}</span>
				</div>
			</div>
		`;
	}
});
