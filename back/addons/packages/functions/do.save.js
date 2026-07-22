import platform from '#platform/addon.js';

platform.packages.Fn('do.save', function()
{
    const value = Object.values(this.Items()).map((item) => ({
        slug: item.Get('slug'),
        status: item.Get('status') === 'disabled' ? 'disabled' : 'enabled'
    }));

    platform.config.one('packages').Set('value', value);
});
