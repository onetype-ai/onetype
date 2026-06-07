onetype.AddonReady('editor.toolbar', () =>
{
    editor.toolbar.Item({
        id: 'publish',
        icon: 'rocket_launch',
        label: 'Publish',
        position: 'right',
        active: true,
        order: 100,
        raw: true,
        render: `
            <e-form-button text="Publish" icon="rocket_launch" :variant="['brand', 'size-s']"></e-form-button>
        `
    });
});