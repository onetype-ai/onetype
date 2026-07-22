platform.settings.Fn('do.scope', function(definition)
{
    const scopes = this.StoreGet('scopes') || {};

    scopes[definition.id] = definition;

    this.StoreSet('scopes', scopes);

    onetype.Emit('platform.settings.scope', { id: definition.id });

    return definition;
});

platform.settings.Fn('scopes', function()
{
    return this.StoreGet('scopes') || {};
});

platform.settings.Fn('scope.active', function(id)
{
    const scope = (this.StoreGet('scopes') || {})[id];

    return scope && scope.active ? scope.active() : null;
});
