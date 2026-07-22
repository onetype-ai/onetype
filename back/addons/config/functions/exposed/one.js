import platform from '#platform/addon.js';

platform.config.FnExpose('one', function(id)
{
    return this.Item(id);
});
