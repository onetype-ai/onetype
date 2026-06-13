onetype.AddonReady('documentation', (documentation) =>
{
	documentation.Item({
		id: 'terminal',
		order: 7,
		group: 'Global',
		icon: 'terminal',
		label: 'Terminal',
		addon: 'terminal',
		title: 'Terminal',
		description: 'Command log and prompt. Every command execution in the editor lands here.',
		overview: `
## Terminal

The terminal lives in the status bar. It does two things, it records every command execution in the editor, and it lets you run commands yourself, the way you would in a shell.

### The log

The framework emits @commands.run after every command execution, success or failure. The terminal listens and stores each run as an entry, who ran is irrelevant, a button click, an AI agent or the prompt all land in the same log. An entry carries the command id, the input it received, the data it resolved with, the message, the status code and how long it took.

Commands registered with silent: true are skipped, use it for noisy internals that would flood the log. The log keeps the newest entries up to terminal.limit, two hundred by default, oldest are dropped first. Clear it any time:

\`\`\`js
$ot.command('terminal:clear');
\`\`\`

### The prompt

The input at the bottom runs commands directly. Type the command id, then the input either as key=value pairs or as raw JSON:

\`\`\`
apps:switch id=builder
modes:switch {"id": "design"}
terminal:clear
\`\`\`

Values in key=value pairs are parsed as JSON when possible, so count=5 is a number and flag=true is a boolean, anything else stays a string. Arrow up and down walk through the history of what you typed. While typing, the prompt suggests the first matching command inline, Tab accepts it.

Unknown commands and invalid input do not vanish, they show up in the log as failed entries with the reason.

### Scripts

Paste multiple lines into the prompt and they run as a script, one command after another, each waiting for the previous one to finish. Empty lines and lines starting with # are skipped, so scripts can carry comments:

\`\`\`
# switch to the builder and open design
apps:switch id=builder
modes:switch id=design
\`\`\`

This is the sharing format. A setup recipe, a migration, a fix, all of it is just a list of commands anyone can paste. Programmatically the same thing is terminal.Fn('script', text).

### Why it matters

Commands are the only way anything changes state in the editor, so this log is the live trace of everything happening. Watching it tells you exactly what the UI, a plugin or an AI agent just did.
		`.trim()
	});
});
