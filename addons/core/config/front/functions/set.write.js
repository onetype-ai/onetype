config.Fn('set.write', function()
{
    const data = this.Fn('get.read');

    for(const item of Object.values(this.Items()))
    {
        data[item.Get('id')] = item.Get('value');
    }

    localStorage.setItem('onetype-config', JSON.stringify(data));
});
