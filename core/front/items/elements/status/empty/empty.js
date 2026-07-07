onetype.AddonReady('elements', (elements) =>
{
	elements.ItemAdd({
		id: 'status-empty',
		icon: 'inbox',
		name: 'Empty',
		description: 'Empty state with icon, title, description, optional action button and optional surface background.',
		category: 'Status',
		config:
		{
			icon:
			{
				type: 'string',
				value: 'inbox',
				description: 'Center icon.'
			},
			title:
			{
				type: 'string',
				value: 'Nothing here yet',
				description: 'Heading text.'
			},
			description:
			{
				type: 'string',
				value: '',
				description: 'Supporting message.'
			},
			action:
			{
				type: 'string',
				value: '',
				description: 'Action button label.'
			},
			color:
			{
				type: 'string',
				value: 'brand',
				options: ['brand', 'blue', 'red', 'orange', 'green'],
				description: 'Icon circle accent color.'
			},
			background:
			{
				type: 'number',
				description: 'Background depth from 1 to 4, renders the empty state on its own bordered surface. Empty keeps it transparent.'
			},
			size:
			{
				type: 'string',
				value: 'm',
				options: ['s', 'm', 'l'],
				description: 'Component size.'
			},
			_click:
			{
				type: 'function',
				description: 'Action button click handler.'
			}
		},
		render: function()
		{
			this.classes = () =>
			{
				const list = ['box', this.color, 'size-' + this.size];

				if(this.background)
				{
					list.push('bg-' + this.background);
				}

				return list.join(' ');
			};

			return /* html */ `
				<div :class="classes()">
					<div class="inner">
						<div class="circle"><i>{{ icon }}</i></div>
						<h2 ot-if="title" class="title">{{ title }}</h2>
						<p ot-if="description" class="description">{{ description }}</p>
						<e-form-button
							ot-if="action"
							:text="action"
							icon="add"
							color="brand"
							:_click="_click"
						></e-form-button>
					</div>
				</div>
			`;
		}
	});
});
