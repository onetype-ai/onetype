onetype.AddonReady('onetype.emitters', function(emitters)
{
    emitters.ItemAdd({
        id: 'platform.collaborators.leave',
        description: 'Fired after a collaborator leaves the editor and the avatar with the cursor disappears.',
        addon: 'platform.collaborators',
        config: {
            id: {
                type: 'string',
                description: 'ID of the collaborator that left.'
            }
        }
    });
});
