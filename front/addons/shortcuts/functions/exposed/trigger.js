platform.shortcuts.FnExpose('trigger', async function(id)
{
    const item = this.ItemGet(id);

    onetype.emitters.fire('platform.shortcuts.trigger', { id: item.Get('id'), key: item.Fn('key') });

    await item.Get('callback')();
});
