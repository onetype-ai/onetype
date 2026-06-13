onetype.AddonReady('documentation', (documentation) =>
{
	documentation.Item({
		id: 'ai-agents',
		order: 2,
		group: 'Modules',
		icon: 'robot_2',
		label: 'AI Agents',
		addon: 'ai.agents',
		title: 'AI Agents',
		description: 'Typed units of AI work. An agent declares its input and output schema, carries instructions for the model and returns validated output with token usage.',
		overview: `
## AI Agents

An agent is a small, typed unit of AI work. Each one declares what it takes in, what it returns and carries the instructions for the model. The addon is the registry, agents are items, and anything in the editor can register one.

Register an agent from anywhere:

\`\`\`js
onetype.AddonReady('ai.agents', (agents) =>
{
	agents.Item({
		id: 'writer',
		name: 'Writer',
		description: 'Writes short interface copy for a given topic.',
		instructions: 'You write short, clean interface copy. Given a topic, write a crisp title and one supporting sentence.',
		input: {
			topic: { type: 'string', required: true, description: 'What the copy is about.' }
		},
		output: {
			title: { type: 'string', description: 'Crisp title, up to 6 words.' },
			description: { type: 'string', description: 'Supporting sentence, up to 16 words.' }
		}
	});
});
\`\`\`

### The contract

The input and output schemas are the data define format, the same one fields and commands use. The input validates what you pass before anything runs. The output becomes a strict JSON schema the model is hard constrained to, including nested objects and enums from options, and the same define validates the parsed response after the run. The output can also be a function of the input when the shape depends on what was asked.

### Running

A run is one round trip. The agent builds the messages, instructions as the system prompt plus a readable description of the input and output fields, sends them through the ai:agents:request pipeline and returns the validated output with the model time and token usage:

\`\`\`js
$ot.command('ai:agents:run', { id: 'writer', input: { topic: 'workspace tabs' } });
\`\`\`

An agent can also declare state, an object or a function returning one. It is resolved fresh on every run and lands in the system message as the current context, so the model always knows the present situation.

Pass a history array and the conversation rides along between the system prompt and the user message:

\`\`\`js
$ot.command('ai:agents:run', {
	id: 'writer',
	input: { topic: 'workspace tabs' },
	history: [
		{ role: 'user', content: 'Keep it under five words.' }
	]
});
\`\`\`

### Tools

An agent without instructions never calls the model. Its onAfter hook is the whole job, which makes it a plain tool with the same typed contract as everything else. A caller cannot tell the difference, which is the point. onBefore runs right before the request and sees the full payload.

\`\`\`js
agents.Item({
	id: 'counter',
	description: 'Counts the letters of a word.',
	input: {
		word: { type: 'string', required: true, description: 'The word.' }
	},
	output: {
		count: { type: 'number', description: 'Letter count.' }
	},
	onAfter: ({ input, output }) => { output.count = input.word.length; }
});
\`\`\`

### Under the hood

The request pipeline is a normal framework pipeline, so it can be joined to swap the endpoint, reshape the body or intercept the response. By default it talks to a local OpenAI compatible server. The ai:agents:list command shows what is registered, agents whose condition returns falsy stay hidden.
		`.trim()
	});
});
