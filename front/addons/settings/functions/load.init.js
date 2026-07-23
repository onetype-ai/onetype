platform.settings.Fn('load.init', function()
{
    if(onetype.iframe)
    {
        return;
    }

    Object.entries(platform.config.Fn('get.read')).forEach(([key, value]) =>
    {
        if(!key.startsWith('platform.settings.'))
        {
            return;
        }

        const id = key.slice('platform.settings.'.length);

        let item = this.ItemGet(id);

        if(!item)
        {
            item = this.Item({ id });
        }

        item.Set('value', value);

        onetype.emitters.fire('platform.settings.change', { id, value });
    });
});
