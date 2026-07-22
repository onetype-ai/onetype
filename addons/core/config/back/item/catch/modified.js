import config from '#config/addon.js';

config.ItemOn('modified', () =>
{
    config.Fn('set.write');
});
