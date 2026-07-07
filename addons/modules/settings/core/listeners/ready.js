onetype.EmitOn('@document.ready', () =>
{
	modules.settings.Fn('init');

	onetype.Emit('modules.settings.ready');
});
