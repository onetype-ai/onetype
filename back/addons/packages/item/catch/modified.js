import platform from '#platform/addon.js';

platform.packages.ItemOn('modified', () =>
{
    platform.packages.Fn('do.save');
});
