import platform from '#platform/addon.js';

platform.packages.Fn('get.scoped', function(scope)
{
    const list = new Set();

    this.methods.add = (item) =>
    {
        if(list.has(item.Get('slug')))
        {
            return;
        }

        list.add(item.Get('slug'));

        for(const slug of item.Get('bundle'))
        {
            const dependency = this.one(slug);

            if(dependency)
            {
                this.methods.add(dependency);
            }
        }
    };

    for(const item of Object.values(this.Items()))
    {
        if(item.Get('status') !== 'enabled')
        {
            continue;
        }

        const runtimes = item.Get('runtimes');

        if(runtimes.includes('*') || runtimes.includes(scope))
        {
            this.methods.add(item);
        }
    }

    return list;
});
