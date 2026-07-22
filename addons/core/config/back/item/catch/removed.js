import config from '#config/addon.js';

config.ItemOn('removed', () =>
{
    config.Fn('set.write');
});
