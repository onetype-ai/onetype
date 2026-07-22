import platform from '#platform/addon.js';

platform.config.FnExpose('get', function(id)
{
    const item = this.one(id);

    return item ? item.Get('value') : null;
});
