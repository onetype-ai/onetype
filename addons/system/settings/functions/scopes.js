settings.Fn('scope.register', function(definition)
{
	const scopes = this.StoreGet('scopes') || {};

	scopes[definition.id] = definition;

	this.StoreSet('scopes', scopes);

	onetype.Emit('settings.scope', { id: definition.id });

	return definition;
});

settings.Fn('scopes', function()
{
	return this.StoreGet('scopes') || {};
});

settings.Fn('scope.active', function(id)
{
	const scope = (this.StoreGet('scopes') || {})[id];

	return scope && scope.active ? scope.active() : null;
});
