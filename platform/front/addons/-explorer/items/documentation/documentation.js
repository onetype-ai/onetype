onetype.AddonReady('documentation', (documentation) =>
{
	documentation.Item({
		id: 'explorer',
		order: 6,
		group: 'Global',
		icon: 'search',
		label: 'Explorer',
		addon: 'explorer',
		title: 'Explorer',
		description: 'Universal search over everything in the editor. One entry per thing, selection runs its callback.',
		overview: `
## Explorer

The explorer is the search of the whole editor, opened with the search pill in the navbar or meta K. One input, everything reachable: applications, modes, pages, settings, shortcuts, extensions, and whatever an extension adds tomorrow.

One entry is one thing. Every item of this addon is a single searchable entry:

\`\`\`js
onetype.AddonReady('explorer', (explorer) =>
{
	explorer.Item({
		id: 'page-about',
		order: 30,
		group: 'Pages',
		prefix: 'pages',
		icon: 'web_asset',
		label: 'About',
		hint: 'Jump to page',
		keywords: ['about'],
		callback: () => $ot.command('canvas:jump', { id: 'about' })
	});
});
\`\`\`

### Searching

The query matches against label, hint and keywords. Typing a prefix like pages: or apps: narrows the search to that group and lifts the result cap from 5 to 15. Groups sort by order, entries inside a group alphabetically. Arrows move through the results and follow the scroll, Enter runs the selection, Escape closes.

### Scoping

Entries scope themselves like every other extension point. app and mode list where the entry applies, empty means everywhere. condition is a live check evaluated on every search, so an entry can follow external state: the shortcut entries use it to drop out of the results while their shortcut is disabled.

### Commands and events

The explorer:toggle command opens and closes the search. It flips the state without input, takes an explicit open, and explorer.toggle fires on every change, including Escape and backdrop closes. Selecting an entry runs the explorer:run command, which executes the callback and emits explorer.run with the entry id, so anything can react to what people actually use.

### Keeping entries in sync

Owners keep their entries fresh. Each domain registers one explorer entry per thing it owns and adds or removes entries when its own items change:

\`\`\`js
onetype.AddonReady('explorer', (explorer) =>
{
	pages.ItemOn('add', (item) =>
	{
		explorer.Item({
			id: 'page-' + item.Get('id'),
			group: 'Pages',
			label: item.Get('name'),
			callback: () => $ot.command('pages:open', { id: item.Get('id') })
		});
	});

	pages.ItemOn('remove', (item) =>
	{
		explorer.ItemRemove('page-' + item.Get('id'));
	});
});
\`\`\`

The explorer itself stays a plain registry with a generic search over it. Nothing about the built in entries is privileged.
		`.trim()
	});
});
