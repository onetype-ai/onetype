onetype.AddonReady('elements', (elements) =>
{
	elements.ItemAdd({
		id: 'cards-item',
		icon: 'dashboard',
		name: 'Item Card',
		description: 'Generic content card with icon, badge, eyebrow, title, description and a meta row pinned to the bottom.',
		category: 'Cards',
		config:
		{
			icon:
			{
				type: 'string',
				description: 'Material Symbols icon shown in the wrap at the top of the card.'
			},
			color:
			{
				type: 'string',
				options: ['brand', 'blue', 'red', 'orange', 'green'],
				description: 'Accent color of the icon wrap and badge. Empty keeps them neutral.'
			},
			badge:
			{
				type: 'string',
				description: 'Small label chip in the top right corner.'
			},
			eyebrow:
			{
				type: 'string',
				description: 'Uppercase label above the title.'
			},
			title:
			{
				type: 'string',
				description: 'Card title.'
			},
			description:
			{
				type: 'string',
				description: 'Supporting text under the title.'
			},
			meta:
			{
				type: 'array',
				value: [],
				each:
				{
					type: 'object',
					config:
					{
						icon:
						{
							type: 'string',
							description: 'Material Symbols icon in front of the label.'
						},
						label:
						{
							type: 'string',
							description: 'Meta text.'
						}
					}
				},
				description: 'Icon and label pairs pinned to the bottom of the card.'
			},
			href:
			{
				type: 'string',
				description: 'Renders the card as a link.'
			},
			target:
			{
				type: 'string',
				description: 'Link target, like _blank.'
			},
			background:
			{
				type: 'number',
				value: 2,
				description: 'Background depth from 1 to 4. Nested surfaces inside the card go one step deeper.'
			},
			size:
			{
				type: 'string',
				value: 'm',
				options: ['s', 'm', 'l'],
				description: 'Card size, controls padding and type scale.'
			},
			isActive:
			{
				type: 'boolean',
				value: false,
				description: 'Selected state, highlights the card border.'
			},
			isDisabled:
			{
				type: 'boolean',
				value: false,
				description: 'Disabled state, dims the card and blocks clicks.'
			},
			_click:
			{
				type: 'function',
				description: 'Click handler. Receives { event }.'
			}
		},
		render: function()
		{
			this.classes = () =>
			{
				const list = ['box', 'bg-' + this.background, 'size-' + this.size];

				if(this.color)
				{
					list.push(this.color);
				}

				if(this.href || this._click)
				{
					list.push('clickable');
				}

				if(this.isActive)
				{
					list.push('active');
				}

				if(this.isDisabled)
				{
					list.push('disabled');
				}

				return list.join(' ');
			};

			this.wrap = () =>
			{
				return 'wrap bg-' + Math.min(this.background + 1, 4);
			};

			this.click = ({ event }) =>
			{
				if(this.isDisabled)
				{
					event.preventDefault();

					return;
				}

				this._click && this._click({ event });
			};

			return `
				<${this.href ? 'a' : 'div'} :class="classes()" :href="href || null" :target="target || null" ot-click="click">
					<header ot-if="icon || badge">
						<div ot-if="icon" :class="wrap()"><i>{{ icon }}</i></div>
						<span ot-if="badge" class="badge">{{ badge }}</span>
					</header>
					<span ot-if="eyebrow" class="eyebrow">{{ eyebrow }}</span>
					<h3 ot-if="title" class="title">{{ title }}</h3>
					<p ot-if="description" class="description">{{ description }}</p>
					<div ot-if="meta.length" class="meta">
						<span ot-for="entry in meta" class="entry">
							<i ot-if="entry.icon">{{ entry.icon }}</i>
							<span>{{ entry.label }}</span>
						</span>
					</div>
				</${this.href ? 'a' : 'div'}>
			`;
		}
	});
});
