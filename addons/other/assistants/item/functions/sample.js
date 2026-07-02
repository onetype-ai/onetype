assistants.Fn('item.sample', function(item, verdict, reason)
{
	const agent = onetype.AddonGet('ai.agents').ItemGet('assistant');
	const state = typeof agent.Get('state') === 'function' ? agent.Get('state')({ input: { assistant: item.Get('id') } }) : agent.Get('state');

	return {
		agent: agent.Get('id'),
		verdict,
		reason,
		instructions: agent.Get('instructions'),
		state,
		messages: item.Get('messages').filter((message) => message.role !== 'error'),
		time: new Date().toISOString()
	};
});
