modes.Metadata('title', 'Modes');
modes.Metadata('description', 'The editing modes of the builder.');
modes.Metadata('overview', `
## Modes

Modes are the different ways you work on a site. Design for building and styling, Content for editing text and images, Responsive for breakpoints, Preview for a clean look, AI for talking to the site. Only one mode is active at a time.

Each mode is an addon item:

\`\`\`js
modes.Item({
	id: 'design',
	order: 1,
	icon: 'space_dashboard',
	label: 'Design'
});
\`\`\`

### Switching

The active mode lives in settings under modes.active, so it persists across reloads. Switch with the command:

\`\`\`js
$ot.command('modes:switch', { id: 'content' });
\`\`\`

That sets the setting, runs onDeactivate on the old mode and onActivate on the new one, and fires modes.switch.

### Why it matters

Layout items can target a mode the same way they target an app. An item with mode set to design only shows in Design mode. Combined with apps, these two settings decide what the whole workspace shows at any moment.
`.trim());
