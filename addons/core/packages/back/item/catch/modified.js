import packages from '#packages/addon.js';

packages.ItemOn('modified', () =>
{
    packages.Fn('do.save');
});
