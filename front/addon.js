const platform = onetype.Addon('platform', () =>
{
    onetype.emitters.catch('onetype.document.ready', async () =>
    {
        await onetype.middlewares.run('platform.boot');

        onetype.StateSet('platform.booted', true);

        await onetype.emitters.fire('platform.boot');

        platform.Fn('do.author');
    });
});
