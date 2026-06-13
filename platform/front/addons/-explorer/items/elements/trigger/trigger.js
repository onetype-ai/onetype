elements.ItemAdd({
	id: 'explorer-trigger',
	icon: 'search',
	name: 'Explorer Trigger',
	description: 'Search pill in the navbar that opens the explorer.',
	category: 'Explorer',
	author: 'OneType',
	metadata: { addon: 'explorer' },
	render: function()
	{
		this.open = () =>
		{
			$ot.command('explorer:toggle', { open: true });
		};

		return `
			<div class="box" ot-click="open">
				<i>keyboard_command_key</i>
				<span>Search...</span>
			</div>
		`;
	}
});
