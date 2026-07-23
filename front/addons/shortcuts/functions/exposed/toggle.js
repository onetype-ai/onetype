platform.shortcuts.FnExpose('toggle', function(id, enabled)
{
    const item = this.ItemGet(id);

    if(item.Fn('enabled') === enabled)
    {
        return false;
    }

    this.Fn('do.save', id, { enabled: enabled === item.Get('enabled') ? undefined : enabled });

    onetype.emitters.fire('platform.shortcuts.toggle', { id, enabled });

    return true;
});
