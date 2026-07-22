import platform from '#platform/addon.js';

platform.packages.Fn('item.disable', function(item)
{
    item.Set('status', 'disabled');
});
