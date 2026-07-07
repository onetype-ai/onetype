ui.dashboard.types.Item({
	id: 'actions',
	config: {
		color: { type: 'string', value: '', description: 'Accent color name inherited from the widget.' },
		payload: {
			type: 'object',
			value: {},
			config: {
				actions: {
					type: 'array',
					value: [],
					each: {
						type: 'object',
						config: {
							icon: { type: 'string', value: '', description: 'Leading Material Symbols icon.' },
							label: { type: 'string', value: '', description: 'Action title.' },
							description: { type: 'string', value: '', description: 'Muted text under the label.' },
							hint: { type: 'string', value: '', description: 'Short badge on the right, like a count or a shortcut.' },
							color: { type: 'string', value: '', description: 'Accent color name. Empty uses the widget accent.' },
							disabled: { type: 'boolean', value: false, description: 'Dims the action and blocks the click.' },
							onClick: { type: 'function', description: 'Called with the action on click.' }
						}
					},
					description: 'Actions top to bottom.'
				}
			},
			description: 'Actions data.'
		}
	},
	render: function()
	{
		this.Compute(() =>
		{
			this.empty = !(this.payload.actions || []).length;
			this.actions = (this.payload.actions || []).map((action) =>
			{
				return { ...action, color: action.color || this.color || 'brand' };
			});
		});

		this.classes = (action) =>
		{
			return action.disabled ? 'action ' + action.color + ' disabled' : 'action ' + action.color;
		};

		this.run = (action) =>
		{
			if(!action.disabled && action.onClick)
			{
				action.onClick(action);
			}
		};

		return `
			<div class="box">
				<div ot-if="empty" class="empty">No actions</div>
				<button ot-for="action in actions" :ot-key="action.label" type="button" :class="classes(action)" ot-click="() => run(action)">
					<div ot-if="action.icon" class="wrap"><i>{{ action.icon }}</i></div>
					<div class="text">
						<span class="label">{{ action.label }}</span>
						<span ot-if="action.description" class="description">{{ action.description }}</span>
					</div>
					<span ot-if="action.hint" class="hint">{{ action.hint }}</span>
					<i class="go">arrow_forward</i>
				</button>
			</div>
		`;
	}
});
