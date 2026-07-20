$ot.modules.shortcuts.Fn('trigger', async function(id)
{
	const item = this.ItemGet(id);

	onetype.Emit('modules.shortcuts.trigger', { id: item.Get('id'), key: item.Fn('key') });

	await item.Get('callback')();
});
