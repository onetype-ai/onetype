commands.ItemOn('modify', (item) =>
{
	const meta = item.Get('meta');

	agents.ItemGet(item.Get('id'), (agent) => 
	{
		agent.Set('description', item.Get('description'));
		agent.Set('instructions', meta.instructions);
		agent.Set('input', item.Get('in'));
		agent.Set('output', item.Get('out'));
	});
});