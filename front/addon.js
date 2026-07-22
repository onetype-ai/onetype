const platform = onetype.Addon('platform', () =>
{
    onetype.EmitOn('onetype.document.ready', async () =>
    {
        await onetype.Middleware('platform.boot');
        await onetype.Emit('platform.boot');

        platform.Fn('do.author');
    });
});
