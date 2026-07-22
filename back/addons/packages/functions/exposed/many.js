import platform from '#platform/addon.js';

platform.packages.FnExpose('many', function()
{
    return Object.values(this.Items());
});
