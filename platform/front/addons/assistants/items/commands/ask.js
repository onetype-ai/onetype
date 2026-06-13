commands.Item({
	id: 'assistants:ask',
	exposed: true,
	description: 'Talk to an assistant. It chats back, learns the user along the way and will launch workflows for real work.',
	metadata: { addon: 'assistants' },
	in: {
		id: {
			type: 'string',
			value: 'main',
			description: 'Which assistant to talk to.'
		},
		prompt: {
			type: 'string',
			required: true,
			description: 'What to say to the assistant, in plain language.'
		}
	},
	out: {
		message: {
			type: 'string',
			description: 'The assistant reply.'
		},
		workflow: {
			type: 'string',
			required: false,
			description: 'Workflow goal the assistant wrote when the user wants something done, null when it just chatted.'
		},
		report: {
			type: 'string',
			required: false,
			description: 'What the assistant reported after the workflow run, null when no workflow ran.'
		}
	},
	callback: async function(properties, resolve)
	{
		const item = assistants.ItemGet(properties.id);

		if(!item)
		{
			return resolve(null, 'Assistant ' + properties.id + ' does not exist.', 404);
		}

		const history = item.Get('messages').filter((message) => message.role !== 'error');

		item.Fn('message', 'user', properties.prompt);

		try
		{
			const agent = onetype.AddonGet('ai.agents').ItemGet('assistant');
			const { content } = await agent.Fn('run', { message: properties.prompt, assistant: properties.id }, history);

			item.Fn('message', 'assistant', content.message);
			item.Fn('memorize', properties.prompt).catch(() => {});

			if(!content.workflow)
			{
				return resolve({ message: content.message, workflow: null, report: null }, 'Assistant replied.');
			}

			const report = await item.Fn('work', content.workflow);

			resolve({ message: content.message, workflow: content.workflow, report }, 'Assistant ran a workflow and reported back.');
		}
		catch(error)
		{
			item.Fn('message', 'error', 'The model is unreachable: ' + error.message);

			resolve(null, 'Assistant could not reach the model: ' + error.message, 502);
		}
	}
});
