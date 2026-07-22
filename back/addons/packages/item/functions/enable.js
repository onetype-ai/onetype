import platform from '#platform/addon.js';

platform.packages.Fn('item.enable', function(item)
{
    item.Set('status', 'enabled');
});
