import platform from '#platform/addon.js';

platform.packages.FnExpose('limits', function(slug)
{
    return this.one(slug)?.Get('limits');
});
