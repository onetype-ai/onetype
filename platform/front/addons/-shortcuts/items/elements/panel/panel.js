elements.ItemAdd({
	id: 'shortcuts-panel',
	icon: 'keyboard',
	name: 'Shortcuts Panel',
	description: 'Every registered shortcut, grouped, with an enable toggle and key rebinding per row.',
	category: 'Shortcuts',
	author: 'OneType',
	metadata: { addon: 'shortcuts' },
	render: function()
	{
		this.recording = null;
		this.listener = null;

		const refresh = () =>
		{
			this.groups = shortcuts.Fn('list');
		};

		refresh();

		this.On('@addon.item.added', (item) => item.addon.GetName() === 'shortcuts' && refresh());
		this.On('@addon.item.removed', (item) => item.addon.GetName() === 'shortcuts' && refresh());

		this.On('shortcuts.toggle', refresh);
		this.On('shortcuts.rebind', refresh);

		this.change = (row) =>
		{
			return ({ value }) =>
			{
				this.cancel();

				$ot.command('shortcuts:toggle', { id: row.id, enabled: value });
			};
		};

		this.cancel = () =>
		{
			if(this.listener)
			{
				window.removeEventListener('keydown', this.listener, true);
				this.listener = null;
			}

			this.recording = null;
		};

		this.record = (row) =>
		{
			const repeated = this.recording === row.id;

			this.cancel();

			if(repeated)
			{
				return;
			}

			this.recording = row.id;

			this.listener = (event) =>
			{
				event.preventDefault();
				event.stopPropagation();

				if(event.key === 'Escape')
				{
					this.cancel();

					return;
				}

				if(['Control', 'Alt', 'Shift', 'Meta'].includes(event.key))
				{
					return;
				}

				const combination = shortcuts.Fn('parse', event);

				this.cancel();

				$ot.command('shortcuts:rebind', { id: row.id, key: combination });
			};

			window.addEventListener('keydown', this.listener, true);
		};

		this.reset = (row) =>
		{
			this.cancel();

			$ot.command('shortcuts:rebind', { id: row.id });
		};

		this.OnUnmounted(() => this.cancel());

		return `
			<div class="box">
				<div ot-for="group in groups" :ot-key="group.name" class="group">
					<div class="head">
						<span class="title">{{ group.name }}</span>
						<span class="count">{{ group.shortcuts.length }}</span>
					</div>
					<div ot-for="row in group.shortcuts" :ot-key="row.id + ':' + row.enabled" :class="row.enabled ? 'row' : 'row disabled'">
						<div class="info">
							<span class="name ot-truncate">{{ row.name }}</span>
							<span ot-if="row.description" class="description">{{ row.description }}</span>
						</div>
						<span class="keys">
							<i ot-if="row.custom" class="reset" :ot-tooltip="{ text: 'Restore default key', position: { x: 'center', y: 'top' } }" ot-click="reset(row)">history</i>
							<kbd :class="recording === row.id ? 'recording' : (row.custom ? 'custom' : '')" :ot-tooltip="{ text: 'Click, then press the new keys', position: { x: 'center', y: 'top' } }" ot-click="record(row)">{{ recording === row.id ? 'Press keys' : row.key }}</kbd>
						</span>
						<e-form-toggle :value="row.enabled" size="s" :_change="change(row)"></e-form-toggle>
					</div>
				</div>
			</div>
		`;
	}
});
