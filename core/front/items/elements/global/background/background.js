onetype.AddonReady('elements', (elements) =>
{
	elements.ItemAdd({
		id: 'global-background',
		icon: 'grid_on',
		name: 'Background',
		description: 'Fixed decorative app background: dotted texture and large grid squares.',
		category: 'Global',
		config:
		{
			grid:
			{
				type: 'boolean',
				value: true
			}
		},
		render: function()
		{
			return `
				<div class="box" aria-hidden="true">
					<div ot-if="grid" class="grid-lines"></div>
					<div class="dots"></div>
				</div>
			`;
		}
	});
});
