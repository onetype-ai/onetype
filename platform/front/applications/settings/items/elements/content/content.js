elements.ItemAdd({
	id: 'settings-content',
	icon: 'tune',
	name: 'Settings Content',
	description: 'Settings surface. Shows one group, one scope instance, or search results across everything.',
	category: 'Settings',
	author: 'OneType',
	metadata: { addon: 'settings' },
	config: {
		group: {
			type: 'string',
			value: ''
		},
		scope: {
			type: 'string',
			value: ''
		},
		instance: {
			type: 'string',
			value: ''
		}
	},
	render: function()
	{
		this.query = '';
		this.chosen = '';

		const build = () =>
		{
			this.mode = this.query ? 'search' : (this.scope ? 'scope' : 'group');
			this.results = [];
			this.section = null;

			if(this.mode === 'search')
			{
				this.results = settings.Fn('search', this.query);
			}
			else if(this.mode === 'scope')
			{
				const selected = this.instance || this.chosen || null;

				this.section = settings.Fn('scoped', { [this.scope]: selected }, '').find((scope) => scope.id === this.scope) || { id: this.scope, label: this.scope, icon: 'category', instances: [], selected: null, items: [] };
			}
			else
			{
				this.section = settings.Fn('groups', '').find((group) => group.id === (this.group || 'apps')) || { id: this.group, label: this.group, icon: 'extension', items: [] };
			}
		};

		this.Compute(() =>
		{
			this.chosen = this.instance || this.chosen;

			build();
		});

		this.On('@addon.item.added', (item) => item.addon.GetName() === 'settings' && build());
		this.On('@addon.item.removed', (item) => item.addon.GetName() === 'settings' && build());
		this.On('settings.change', build);
		this.On('settings.scope', build);

		this.search = ({ value }) =>
		{
			this.query = (value || '').toLowerCase();

			build();
		};

		this.pick = ({ value }) =>
		{
			this.chosen = value;

			build();
		};

		this.save = (item, value) =>
		{
			const payload = { id: item.id, value };

			if(item.instance)
			{
				payload.instance = item.instance;
			}

			$ot.command('settings:set', payload);
		};

		this.change = (item) =>
		{
			return ({ value }) =>
			{
				this.save(item, value);
			};
		};

		this.toggle = (item) =>
		{
			return ({ value }) =>
			{
				this.save(item, !!value);
			};
		};

		this.copy = (item) =>
		{
			navigator.clipboard.writeText(item.id);

			$ot.float.toast('Copied ' + item.id);
		};

		const rows = (source) => /* html */ `
			<div ot-for="item in ${source}" :ot-key="item.id" :class="item.type === 'transfer' || item.type === 'table' ? 'row wide' : 'row'">
				<div class="about">
					<div class="crumb" ot-if="item.badge">{{ item.badge }}</div>
					<div class="name">{{ item.label }}</div>
					<div class="hint" ot-if="item.description">{{ item.description }}</div>
					<div class="code" :ot-tooltip="{ text: 'Copy id', position: { x: 'center', y: 'top' } }" ot-click="copy(item)">{{ item.id }}</div>
				</div>
				<div class="control" ot-if="item.type !== 'transfer' && item.type !== 'table'">
					<e-form-toggle ot-if="item.type === 'toggle'" :value="item.value" :_change="toggle(item)"></e-form-toggle>
					<e-form-input ot-if="item.type === 'input'" size="s" :value="item.value" :_change="change(item)"></e-form-input>
					<e-form-select ot-if="item.type === 'select'" size="s" :options="item.options" :value="item.value" :_change="change(item)"></e-form-select>
				</div>
				<div ot-if="item.type === 'transfer'" class="picker">
					<e-form-transfer :items="item.options" :value="item.value" :_change="change(item)"></e-form-transfer>
				</div>
				<div ot-if="item.type === 'table'" class="grid">
					<e-data-table :columns="item.columns" :items="item.rows" :variant="['border']"></e-data-table>
				</div>
			</div>
		`;

		return /* html */ `
			<div class="box">
				<div class="ot-container-s ot-py-l">
					<div class="search">
						<e-form-input icon="search" placeholder="Search all settings" :value="query" :_input="search"></e-form-input>
						<span class="count" ot-if="mode === 'search'">{{ results.length }} {{ results.length === 1 ? 'match' : 'matches' }}</span>
					</div>

					<div ot-if="mode === 'search'">
						<e-status-empty ot-if="!results.length" icon="search_off" title="No matches" description="No settings match the search." size="s"></e-status-empty>
						${rows('results')}
					</div>

					<div ot-if="mode !== 'search'" class="group">
						<div class="head">
							<i>{{ section.icon }}</i>
							<span class="title">{{ section.label }}</span>
							<span class="tally" ot-if="mode === 'group'">{{ section.items.length }}</span>
							<div class="who" ot-if="mode === 'scope' && !instance">
								<e-form-select size="s" :options="section.instances" :value="chosen" :_change="pick"></e-form-select>
							</div>
						</div>
						<e-status-empty ot-if="mode === 'scope' && !section.selected" icon="person_search" :title="'No ' + section.label.toLowerCase() + ' selected'" :description="'Choose a ' + section.label.toLowerCase() + ' to see and edit their settings.'" size="s"></e-status-empty>
						<e-status-empty ot-if="mode === 'group' && !section.items.length" icon="tune" title="Nothing here" description="This group has no visible settings." size="s"></e-status-empty>
						${rows('section.items')}
					</div>
				</div>
			</div>
		`;
	}
});
