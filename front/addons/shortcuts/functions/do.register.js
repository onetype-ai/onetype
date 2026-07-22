platform.shortcuts.Fn('do.register', function()
{
    if(this.StoreGet('registered'))
    {
        return;
    }

    const handler = (event) =>
    {
        if(this.Fn('is.editing', event.target) && !event.ctrlKey && !event.altKey && !event.metaKey)
        {
            return;
        }

        const key = this.Fn('exposed.parse', event);

        for(const item of this.Fn('find.match', key))
        {
            if(!item.Fn('active', event))
            {
                continue;
            }

            if(item.Get('prevent'))
            {
                event.preventDefault();
            }

            commands.Fn('run', 'shortcuts:trigger', { id: item.Get('id') });
        }
    };

    document.addEventListener('keydown', handler);

    this.StoreSet('registered', true);
    this.StoreSet('handler', handler);
});
