platform.shortcuts.Fn('item.enabled', function(item)
{
    const entry = platform.config.get('platform.shortcuts.state')[item.Get('id')];

    return entry && 'enabled' in entry ? entry.enabled : item.Get('enabled');
});
