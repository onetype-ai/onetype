platform.shortcuts.Fn('item.key', function(item)
{
    const entry = platform.config.get('platform.shortcuts.state')[item.Get('id')];

    return entry && entry.key ? entry.key : item.Get('key');
});
