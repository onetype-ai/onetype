documentation.Fn('inspect', function(name)
{
	const addon = onetype.AddonGet(name);
	const entry = Object.values(this.Items()).find((item) => item.Get('addon') === name);

	this.owns = (registry) =>
	{
		return Object.values(registry).filter((entry) =>
		{
			const metadata = (entry.Get ? entry.Get('metadata') : (entry.config && entry.config.metadata) || entry.metadata) || {};

			return metadata.addon === name;
		});
	};

	this.fields = () =>
	{
		return addon ? Object.values(addon.Fields().data) : [];
	};

	this.items = () =>
	{
		return addon ? Object.values(addon.Items()) : [];
	};

	this.functions = () =>
	{
		return addon ? Object.values(addon.functions.data).filter((entry) => !entry.name.startsWith('render.')) : [];
	};

	this.store = () =>
	{
		return addon ? Object.entries(addon.StoreGet()) : [];
	};

	return {
		name: name,
		title: entry ? entry.Get('title') : name,
		description: entry ? entry.Get('description') : '',
		overview: entry ? (entry.Get('overview') || '') : '',
		fields: this.fields(),
		items: this.items(),
		functions: this.functions(),
		store: this.store(),
		settings: this.owns(settings.Items()),
		elements: this.owns(elements.Items()),
		commands: this.owns(commands.Items()),
		pipelines: this.owns(onetype.Pipelines()),
		events: this.owns(onetype.Emitters())
	};
});
