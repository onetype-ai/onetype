commands.Item({
	id: 'shortcuts:toggle',
	exposed: true,
	description: 'Enable or disable a shortcut and persist it across reloads. Flips the current state unless enabled is passed explicitly. Emits shortcuts.toggle. Does nothing when the shortcut is already in the requested state.',
	metadata: { addon: 'shortcuts' },
	in: {
		id: {
			type: 'string',
			required: true,
			description: 'ID of the shortcut to toggle. Must match a registered shortcut item.'
		},
		enabled: {
			type: 'boolean',
			description: 'Explicit state to set. Omit to flip the current state.'
		}
	},
	out: {
		id: {
			type: 'string',
			description: 'ID of the shortcut.'
		},
		enabled: {
			type: 'boolean',
			description: 'State the shortcut ended up in.'
		}
	},
	callback: function(properties, resolve)
	{
		const fail = (message, code) =>
		{
			$ot.float.toast({ title: 'Shortcuts', message, type: 'error' });

			resolve(null, message, code);
		};

		const item = shortcuts.ItemGet(properties.id);

		if(!item)
		{
			return fail('Shortcut ' + properties.id + ' not found.', 404);
		}

		const enabled = properties.enabled === undefined ? !item.Fn('enabled') : properties.enabled;

		if(item.Fn('enabled') === enabled)
		{
			return resolve({ id: properties.id, enabled }, 'Shortcut ' + properties.id + ' is already ' + (enabled ? 'enabled' : 'disabled') + '.');
		}

		shortcuts.Fn('save', properties.id, { enabled: enabled === item.Get('enabled') ? undefined : enabled });

		onetype.Emit('shortcuts.toggle', { id: properties.id, enabled });

		resolve({ id: properties.id, enabled }, 'Shortcut ' + properties.id + ' is now ' + (enabled ? 'enabled' : 'disabled') + '.');
	}
});
