onetype.AddonReady('commands', (commands) =>
{
	commands.Item({
		id: 'explorer:toggle',
		exposed: true,
		description: 'Toggle the explorer, the universal search over applications, modes, pages, commands and settings. Flips the current state unless open is passed explicitly. Does nothing when the explorer is already in the requested state.',
		metadata: { addon: 'explorer' },
		in: {
			open: {
				type: 'boolean',
				description: 'Explicit state to set. Omit to flip the current state.'
			}
		},
		out: {
			open: {
				type: 'boolean',
				description: 'Whether the explorer is open now.'
			}
		},
		callback: function(properties, resolve)
		{
			const item = overlays.ItemGet('explorer');
			const open = properties.open === undefined ? !item : properties.open;

			if(open === !!item)
			{
				return resolve({ open }, 'Explorer is already ' + (open ? 'open' : 'closed') + '.');
			}

			if(open)
			{
				$ot.float.modal(() => '<e-explorer></e-explorer>', {
					id: 'explorer',
					onClose: () => onetype.Emit('explorer.toggle', { open: false })
				});

				onetype.Emit('explorer.toggle', { open: true });
			}
			else
			{
				item.Remove();
			}

			resolve({ open }, 'Explorer ' + (open ? 'opened' : 'closed') + '.');
		}
	});
});
