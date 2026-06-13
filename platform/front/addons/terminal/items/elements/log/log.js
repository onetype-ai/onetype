elements.ItemAdd({
	id: 'terminal-log',
	icon: 'sort',
	name: 'Terminal Log',
	description: 'List of recorded command executions.',
	category: 'Terminal',
	author: 'OneType',
	metadata: { addon: 'terminal' },
	render: function()
	{
		const scroll = () =>
		{
			setTimeout(() =>
			{
				const box = this.Element ? this.Element.querySelector('.box') : null;

				if(box)
				{
					box.scrollTop = box.scrollHeight;
				}
			}, 0);
		};

		const refresh = () =>
		{
			this.entries = terminal.Fn('list');

			scroll();
		};

		refresh();

		this.OnMounted(scroll);

		this.On('@addon.item.added', (item) => item.addon.GetName() === 'terminal' && refresh());
		this.On('@addon.item.removed', (item) => item.addon.GetName() === 'terminal' && refresh());

		this.status = (entry) =>
		{
			return entry.code >= 200 && entry.code < 300 ? 'code ok' : 'code error';
		};

		return `
			<div class="box ot-scrollbar">
				<div ot-if="!entries.length" class="empty">No commands executed yet.</div>
				<div ot-for="entry in entries" :ot-key="entry.id" class="entry">
					<span class="at">{{ entry.at }}</span>
					<span :class="status(entry)">{{ entry.code }}</span>
					<span class="command">{{ entry.command }}</span>
					<span class="message ot-truncate">{{ entry.message }}</span>
					<span class="time">{{ entry.time }}ms</span>
				</div>
			</div>
		`;
	}
});
