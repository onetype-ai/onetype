onetype.AddonReady('documentation', (documentation) =>
{
	documentation.Item({
		id: 'assistants',
		order: 4,
		group: 'Global',
		icon: 'smart_toy',
		label: 'Assistants',
		addon: 'assistants',
		title: 'Assistant',
		description: 'The AI companion of the editor. Chats with the user, learns their preferences and launches workflows for real work.',
		overview: `The assistant is the face of the AI layer. It does not know commands and it does not know the editor internals. It knows one thing: it is the OneType assistant, it talks to you, and when you want something done it hands the job over with a precise goal.

The conversation is the whole interface. You chat, it answers, jokes along, asks back. Along the way it learns who you are, what you like and how you work. When you ask it to actually do something, it will launch a workflow with a goal written from everything it knows: what you want, what it learned about you, what to watch out for. The workflow does the work, the assistant reads the result and tells you in plain language. That part is next, right now it tells you honestly that doing things is coming soon.

Under the hood the assistant is a regular ai.agents item. Every assistant is an item carrying its own conversation in messages, and assistants:ask replays it to the agent so the conversation has memory. The reply comes back through the same typed contract every agent uses.

The chat lives in the right panel, the robot button in the navbar toggles it. Everything also works headless: assistants:ask from the terminal does exactly the same thing, and assistants:clear empties the chat.`
	});
});
