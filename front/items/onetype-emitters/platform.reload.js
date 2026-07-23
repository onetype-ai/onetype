onetype.AddonReady('onetype.emitters', function(emitters)
{
    emitters.ItemAdd({
        id: 'platform.reload',
        description: 'Fires after the platform accepted the reload. The current page keeps running against the restarting server.',
        addon: 'platform'
    });
});
