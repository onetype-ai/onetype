platform.shortcuts.Fn('do.save', function(id, changes)
{
    const saved = { ...config.get('platform.shortcuts.state') };
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

    platform.config.set('platform.shortcuts.state', saved);
});
