commands.Item({
	id: 'projects:close',
	exposed: true,
	description: 'Close the active project, leaving no project active. Persists the change and emits projects.close. Does nothing when no project is active.',
	metadata: { addon: 'projects' },
	in: {},
	out: {},
	callback: function(properties, resolve)
	{
		const active = $ot.projects.active();

		if(!active)
		{
			return resolve({}, 'No project is open, nothing to close.');
		}

		$ot.modules.settings.set('projects.active', null);

		onetype.Emit('projects.close');

		resolve({}, 'Project "' + active.Get('name') + '" closed. No project is open now.');
	}
});
