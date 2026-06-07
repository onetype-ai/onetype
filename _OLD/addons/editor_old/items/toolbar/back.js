onetype.AddonReady('editor.toolbar', () =>
{
    editor.toolbar.Item({
        id: 'back',
        icon: 'arrow_back',
        label: 'Back',
        position: 'left',
        active: true,
        order: 10,
        render: `
            <a class="back" href="/">
                <i>arrow_back</i>
            </a>
        `
    });
});
