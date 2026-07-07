modules.shortcuts.Fn('save', function(id, changes)
{
	const saved = { ...$ot.modules.settings.get('modules.shortcuts.state', {}) };
	const entry = { ...saved[id], ...changes };

	for(const field in entry)
	{
		if(entry[field] === undefined)
		{
			delete entry[field];
		}
	}

	if(Object.keys(entry).length)
	{
		saved[id] = entry;
	}
	else
	{
		delete saved[id];
	}

	$ot.modules.settings.set('modules.shortcuts.state', saved);
});
