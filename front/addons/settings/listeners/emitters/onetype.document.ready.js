onetype.emitters.catch('onetype.document.ready', () =>
{
    platform.settings.Fn('load.init');

    onetype.emitters.fire('platform.settings.ready');
});
