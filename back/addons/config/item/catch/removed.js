import platform from '#platform/addon.js';

platform.config.ItemOn('removed', () =>
{
    platform.config.Fn('set.write');
});
