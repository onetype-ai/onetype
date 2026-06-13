assistants.Fn('item.work', async function(item, goal)
{
	const workflows = onetype.AddonGet('ai.workflows');
	const workflow = workflows.Item({ prompt: goal, steps: 100 });

	let outcome;

	try
	{
		const state = await workflow.Fn('run');

		outcome = workflow.Get('status') === 'completed'
			? 'The workflow finished. Result: ' + state.summary
			: 'The workflow could not do it: ' + state.summary;
	}
	catch(error)
	{
		outcome = 'The workflow failed with an error: ' + error.message;
	}

	workflow.Remove();

	/* The assistant reports the outcome in its own voice and language. */

	const agent = onetype.AddonGet('ai.agents').ItemGet('assistant');
	const history = item.Get('messages').filter((message) => message.role !== 'error');

	const { content } = await agent.Fn('run', {
		message: '[system] Report this workflow outcome to the user in their language, in your own words: ' + outcome,
		assistant: item.Get('id')
	}, history);

	item.Fn('message', 'assistant', content.message);

	return content.message;
});
