canvas.Fn('group.register', function(definition)
{
	const groups = this.StoreGet('groups') || {};

	groups[definition.id] = definition;

	this.StoreSet('groups', groups);

	onetype.Emit('canvas.group', { id: definition.id });

	return definition;
});

canvas.Fn('groups', function()
{
	return this.StoreGet('groups') || {};
});
