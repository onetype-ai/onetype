import platform from '#platform/addon.js';

platform.packages.FnExpose('disable', function(slug)
{
    const item = this.one(slug);

    if(!item)
    {
        return false;
    }

    if(item.Fn('is.dependant').length)
    {
        return false;
    }

    item.Fn('disable');

    onetype.emitters.fire('platform.packages.disable', { slug: item.Get('slug') });

    return true;
});
