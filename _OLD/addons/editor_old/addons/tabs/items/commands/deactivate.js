import commands from '@onetype/framework/commands';

commands.Item({
	id: 'editor:tabs:deactivate',
	exposed: true,
	description: 'Deactivate all editor tabs on a position',
	in: {
		position: {
			type: 'string',
			required: true,
			description: 'Tab position to deactivate (left or right)',
			options: ['left', 'right']
		}
	},
	callback: function(properties, resolve)
	{
		editor.tabs.Fn('deactivate', properties.position);

		resolve();
	}
});
