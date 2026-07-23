onetype.AddonReady('admin.layouts', (layouts) =>
{
    layouts.Item({
        id: 'platform.settings.content',
        isActive: true,
        condition: { app: ['settings'] },
        zone: 'root',
        slot: 'center',
        render: function()
        {
            this.group = this.group ? this.group : null;
            this.scope = this.scope ? this.scope : null;

            return '<e-platform-settings-content :group="group" :scope="scope"></e-platform-settings-content>';
        }
    });
});
