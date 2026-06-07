elements.ItemAdd({
	id: 'documentation-overview',
	icon: 'info',
	name: 'Documentation Overview',
	description: 'Renders an addon overview from its metadata.',
	category: 'Documentation',
	author: 'OneType',
	config: {
		content: {
			type: 'string',
			value: ''
		}
	},
	render: function()
	{
		return /* html */ `
			<e-global-markdown :content="content"></e-global-markdown>
		`;
	}
});
