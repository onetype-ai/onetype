import platform from '#platform/addon.js';

onetype.emitters.catch('platform.boot', () =>
{
    platform.Fn('do.author');
});
