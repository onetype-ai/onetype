onetype.AddonReady('elements', (elements) =>
{
	elements.ItemAdd({
		id: 'status-loading',
		icon: 'progress_activity',
		name: 'Loading',
		description: 'Loading state with spinner, optional message and optional surface background.',
		category: 'Status',
		config:
		{
			text:
			{
				type: 'string',
				value: '',
				description: 'Message below spinner.'
			},
			color:
			{
				type: 'string',
				value: 'brand',
				options: ['brand', 'blue', 'red', 'orange', 'green'],
				description: 'Spinner color.'
			},
			background:
			{
				type: 'number',
				description: 'Background depth from 1 to 4, renders the loading state on its own bordered surface. Empty keeps it transparent.'
			},
			size:
			{
				type: 'string',
				value: 'm',
				options: ['s', 'm', 'l'],
				description: 'Spinner size.'
			},
			auto:
			{
				type: 'boolean',
				value: false,
				description: 'Remove min-height constraint.'
			}
		},
		render: function()
		{
			/* ===== CLASSES ===== */

			this.classes = () =>
			{
				const list = ['box', this.color, 'size-' + this.size];

				if(this.background)
				{
					list.push('bg-' + this.background);
				}

				if(this.auto)
				{
					list.push('auto');
				}

				return list.join(' ');
			};

			/* ===== RENDER ===== */

			return /* html */ `
				<div :class="classes()">
					<div class="circle"><i class="spin">progress_activity</i></div>
					<span ot-if="text" class="text">{{ text }}</span>
				</div>
			`;
		}
	});
});
