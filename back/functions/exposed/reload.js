import platform from '#platform/addon.js';

platform.FnExpose('reload', async function()
{
    const context = await onetype.middlewares.run('platform.reload', { cancel: false });

    if(context.value.cancel)
    {
        return false;
    }

    onetype.emitters.fire('platform.reload');

    setTimeout(() => process.exit(75), 100);

    return true;
});
