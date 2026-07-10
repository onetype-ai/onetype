assistants.Fn('item.memorize', async function(item, message)
{
	const agent = ai.agents.ItemGet('memory');
	const { content } = await agent.Fn('run', { preferences: item.Get('preferences'), message });

	content.remove.forEach((preference) => item.Fn('forget', preference));
	content.add.forEach((preference) => item.Fn('remember', preference));
});
