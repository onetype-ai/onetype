elements.ItemAdd({
	id: 'modes-bar',
	icon: 'layout',
	name: 'Modes Bar',
	description: 'Floating bar to switch modes.',
	category: 'Modes',
	author: 'OneType',
	metadata: { addon: 'modes' },
	render: function()
	{
		this.OnMounted(() =>
		{
			const slot = this.Element.closest('.slot');
			if(slot)
			{
				new MutationObserver((muts) =>
				{
					muts.forEach((m) => m.removedNodes.forEach((n) => console.log('[OBSERVER] REMOVED:', n.nodeName, n.className || n.textContent || '', 'from parent:', m.target.className || m.target.nodeName)));
				}).observe(slot, { childList: true, subtree: true });
			}
		});

		this.modes = modes.Fn('list');

		this.On('settings.change', (change) =>
		{
			if(change.id === 'modes.active' || change.id === 'apps.active')
			{
				this.modes = modes.Fn('list');
			}
		});

		this.classes = (mode) =>
		{
			return mode.active ? 'mode active' : 'mode';
		};

		this.select = (mode) =>
		{
			$ot.command('modes:switch', {id: mode.id});
		};

		return `
			<div class="holder">
				<div ot-for="mode in modes" :ot-key="mode.id" :class="classes(mode)" :ot-tooltip="{ text: mode.label, position: { x: 'center', y: 'top' } }" ot-click="select(mode)">
					<i>{{ mode.icon }}</i>
				</div>
			</div>
		`;
	}
});
