assistants.Fn('item.message', function(item, role, content)
{
	const messages = item.Get('messages');

	messages.push({ role, content });
	item.Set('messages', messages);

	onetype.Emit('assistants.message', { id: item.Get('id'), role, content });
});
