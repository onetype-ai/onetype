onetype.AddonReady('documentation', (documentation) =>
{
	documentation.Item({
		id: 'settings',
		order: 2,
		group: 'Global',
		icon: 'settings',
		label: 'Settings',
		addon: 'settings',
		title: 'Settings',
		description: 'Centralized, persistent state with an auto-generated UI.',
		overview: `
## Settings

Settings hold the UI and application state in one place. The active app, the current workspace, limits, flags, even managed collections like team members or permissions. Register a setting and it exists everywhere at once, in the registry, in the settings app UI, in the terminal, for the AI.

A setting declares a control, not just a value. The settings app renders it without any custom UI work:

\`\`\`js
onetype.AddonReady('settings', (settings) =>
{
	settings.Item({
		id: 'terminal.limit',
		label: 'Log limit',
		type: 'number',
		default: 200,
		metadata: { addon: 'terminal' },
		description: 'Maximum number of kept log entries.'
	});
});
\`\`\`

### Controls

- **input** is a text field, **toggle** an on or off switch.
- **select** offers one of options, plain values, { label, value } objects, or a function returning them.
- **transfer** picks a set out of options, two panels, available and selected. This is how permissions plug in, the addon passes every known permission through options and the chosen ones become the value.

A setting without a type holds internal state, it persists and syncs like any other but stays out of the settings app. The layout state is like that.

\`\`\`js
settings.Item({
	id: 'permissions.granted',
	label: 'Granted permissions',
	type: 'transfer',
	options: () => Object.values(permissions.Items()).map((item) =>
	{
		return { value: item.Get('id'), label: item.Get('name'), description: item.Get('app') };
	}),
	default: [],
	metadata: { addon: 'permissions' },
	description: 'Permissions in effect.'
});
\`\`\`

### Scopes

A setting can belong to a scope, like user. Scoped settings keep one value per scope instance, the settings app shows them in their own section with an instance picker, and reads without an explicit instance resolve against the active one. Anything can register a scope:

\`\`\`js
settings.Fn('scope.register', {
	id: 'user',
	label: 'User',
	icon: 'person',
	options: () => Object.values(users.Items()).map((item) => ({ label: item.Get('name'), value: item.Get('id') })),
	active: () => session.user
});
\`\`\`

Then any setting opts in with scope: 'user'. Tomorrow the same works for collections, sites, anything with settings of its own. The settings:set command takes an optional instance to write for someone specific.

### Storage

Every setting names where it lives through storage. local keeps it in the browser, database follows the account across devices, custom means the owning addon keeps the data itself and settings only projects it, like the users table. Local is the default.

### Reading and writing

Reading is direct, it is not an action:

\`\`\`js
settings.Fn('get', 'terminal.limit', 200);
\`\`\`

Writing goes through the command, so it validates against the control, persists, emits and leaves a trace:

\`\`\`
settings:set id=terminal.limit value=300
\`\`\`

To react to changes, listen to settings.change and check the id, never re-render on the whole state.

### Boot

On document ready the stored values load back in, settings.change fires for each and settings.ready fires once at the end. Anything that restores its own state from settings must wait for settings.ready, not @document.ready.
		`.trim()
	});
});
