platform.FnExpose('reload', async function()
{
    const context = await onetype.middlewares.run('platform.reload', { cancel: false });

    if(context.value.cancel)
    {
        return {
            data: null,
            message: 'Reload was cancelled.',
            code: 409
        };
    }

    const response = await $ot.command('platform:reload', {}, true);

    if(response.code === 200)
    {
        onetype.emitters.fire('platform.reload');
    }

    return response;
});
