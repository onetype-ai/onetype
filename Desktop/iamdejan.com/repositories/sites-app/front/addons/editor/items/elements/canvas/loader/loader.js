elements.ItemAdd({
	id: 'editor-loader',
	icon: 'hourglass_empty',
	name: 'Editor Loader',
	description: 'Loading screen for the editor.',
	category: 'Editor',
	author: 'OneType',
	render: function()
	{
		return `
			<div class="holder">
				<div class="backdrop"></div>
				<div class="content">
					<div class="logo">
						<div class="ring"></div>
						<div class="ring ring-outer"></div>
						<i>edit_square</i>
					</div>
					<div class="text">
						<span class="title">Loading Editor</span>
						<span class="description">Preparing your workspace...</span>
					</div>
					<div class="bar">
						<div class="progress"></div>
					</div>
				</div>
			</div>
		`;
	}
});
