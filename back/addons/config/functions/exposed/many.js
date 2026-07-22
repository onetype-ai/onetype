import platform from '#platform/addon.js';

platform.config.FnExpose('many', function()
{
    return Object.values(this.Items());
});
