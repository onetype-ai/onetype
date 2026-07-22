platform.settings.Fn('do.persist', function()
{
    if(onetype.iframe)
    {
        return {};
    }

    const data = {};
    const stored = platform.config.Fn('get.read');

    Object.values(this.Items()).forEach((item) =>
    {
        if(item.Get('storage') === 'local')
        {
            data[item.Get('id')] = item.Get('value');

            stored['platform.settings.' + item.Get('id')] = item.Get('value');
        }
    });

    localStorage.setItem('onetype-config', JSON.stringify(stored));

    return data;
});
