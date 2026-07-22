import platform from '#platform/addon.js';

platform.packages.Fn('item.is.scoped', function(item, scope)
{
    return this.Fn('get.scoped', scope).has(item.Get('slug'));
});
