onetype.AddonReady('documentation', (documentation) =>
{
	documentation.Item({
		id: 'extensions',
		order: 7,
		group: 'Global',
		icon: 'extension',
		label: 'Extensions',
		addon: 'extensions',
		title: 'Extensions',
		description: 'The marketplace. Everything in the editor is an extension and this is where they are found, installed and removed.',
		overview: `Extensions are the core of the platform: apps, agents, panels, commands, sources, all of it ships as an extension. The marketplace is where they live.

Every extension is an item of this addon with its store face: name, icon, author, category, rating, price, and flags for featured and trending rows. The store renders from the live registry, the sidebar categories build themselves, and search works over everything.

Installing is one click and one command, extensions:install and extensions:uninstall. The installed list persists in settings and survives reloads. Both emit their events, so anything can react when the editor grows a new ability.

The catalog is demo content for now. The real registry, payments and runtime loading of third party code come later, the mechanics in front of you do not change.`
	});
});
