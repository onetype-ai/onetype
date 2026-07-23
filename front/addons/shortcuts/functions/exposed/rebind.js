platform.shortcuts.FnExpose('rebind', function(id, key)
{
    const item = this.ItemGet(id);

    if(item.Fn('key') === key)
    {
        return false;
    }

    this.Fn('do.save', id, { key: key === item.Get('key') ? undefined : key });

    onetype.emitters.fire('platform.shortcuts.rebind', { id, key });

    return true;
});
