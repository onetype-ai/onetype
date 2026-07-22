import platform from '#platform/addon.js';

platform.config.ItemOn('modified', () =>
{
    platform.config.Fn('set.write');
});
