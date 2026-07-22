import platform from '#platform/addon.js';

platform.packages.FnExpose('one', function(slug)
{
    return Object.values(this.Items()).find((item) => item.Get('slug') === slug);
});
