elements.ItemAdd({
	id: 'projects-switcher',
	icon: 'folder',
	name: 'Projects Switcher',
	description: 'Active project picker in the navbar. Switches the active project.',
	category: 'Projects',
	author: 'OneType',
	metadata: { addon: 'projects' },
	config: {
		background: {
			type: 'number',
			value: 2,
			options: [1, 2, 3, 4],
			description: 'Background depth of the select control.'
		}
	},
	render: function()
	{
		const refresh = () =>
		{
			this.options = [
				{ label: 'New Project', value: '__new', icon: 'add' },
				...projects.Fn('list').map((project) => ({ label: project.name, value: project.id, icon: 'folder' }))
			];
			this.value = $ot.modules.settings.get('projects.active', null);
		};

		refresh();

		this.On('@addon.item.added', (item) => item.addon.GetName() === 'projects' && refresh());
		this.On('@addon.item.modified', (item) => item.addon.GetName() === 'projects' && refresh());
		this.On('@addon.item.removed', (item) => item.addon.GetName() === 'projects' && refresh());
		
		this.On('projects.open', refresh);
		this.On('projects.close', refresh);

		this.change = ({ value }) =>
		{
			if(value === '__new')
			{
				return $ot.projects.create({}, { toast: true });
			}

			if($ot.projects.active()?.Get('id') === value)
			{
				return $ot.projects.close();
			}

			$ot.projects.open(value);
		};

		return `
			<e-form-select
				:value="value"
				:options="options"
				:icon="'folder'"
				:placeholder="'Select project'"
				:background="'bg-' + background"
				:variant="['border']"
				:size="'s'"
				:_change="change"
			></e-form-select>
		`;
	}
});
