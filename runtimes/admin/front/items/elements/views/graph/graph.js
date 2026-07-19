onetype.AddonReady('elements', (elements) =>
{
	elements.ItemAdd({
		id: 'views-graph',
		icon: 'graph_3',
		name: 'Graph View',
		description: 'Hierarchy drawn as a wide canvas: rich cards with covers laid out left to right by depth, curved connectors between parents and children, panning by scroll.',
		category: 'Views',
		collection: 'Home',
		author: 'OneType',
		config: {
			items: {
				type: 'array',
				value: [
					{ id: 'ceo', title: 'Vera Antić', subtitle: 'Chief Executive', icon: 'face', color: 'brand', badge: 'Lead', children: [
						{ id: 'product', title: 'Marko Ilić', subtitle: 'Product', icon: 'face', color: 'blue', children: [
							{ id: 'design', title: 'Sara Perić', subtitle: 'Design', icon: 'face', color: 'green' },
							{ id: 'research', title: 'Ivan Simić', subtitle: 'Research', icon: 'face', color: 'orange' }
						] },
						{ id: 'engineering', title: 'Lena Kovač', subtitle: 'Engineering', icon: 'face', color: 'red', children: [
							{ id: 'platform', title: 'Platform', subtitle: 'Core systems', icon: 'hub', color: 'red' },
							{ id: 'mobile', title: 'Mobile', subtitle: 'Apps', icon: 'smartphone', color: 'blue' }
						] }
					] }
				],
				each: {
					type: 'object',
					description: 'A single node: id, title, optional subtitle, icon, color, badge, meta, cover image url and children of the same shape.'
				},
				description: 'Nodes of the first level, nested through children.'
			},
			active: {
				type: 'string',
				description: 'Id of the selected node.'
			},
			empty: {
				type: 'string',
				value: 'Nothing to draw yet.',
				description: 'Message shown while there are no nodes.'
			},
			background: {
				type: 'number',
				value: 0,
				options: [0, 1, 2, 3],
				description: 'Background depth the canvas sits on. Cards sit one step above.'
			},
			_open: {
				type: 'function',
				description: 'Called with { value } holding the node when a card is opened.'
			}
		},
		render: function()
		{
			const WIDTH = 250;
			const HEIGHT = 108;
			const GAP_X = 90;
			const GAP_Y = 18;
			const PAD = 24;

			this.current = this.active ? this.active : '';

			this.layout = () =>
			{
				const cards = [];
				const links = [];
				let cursor = 0;

				const walk = (node, depth, parent) =>
				{
					const children = Array.isArray(node.children) ? node.children : [];
					const start = cursor;

					const card = { node, x: PAD + depth * (WIDTH + GAP_X), y: 0 };

					cards.push(card);

					if(children.length)
					{
						for(const child of children)
						{
							walk(child, depth + 1, card);
						}

						const mine = cards.filter((entry) => children.includes(entry.node));

						card.y = (Math.min(...mine.map((entry) => entry.y)) + Math.max(...mine.map((entry) => entry.y))) / 2;
					}
					else
					{
						card.y = PAD + cursor * (HEIGHT + GAP_Y);
						cursor = cursor + 1;
					}

					if(parent)
					{
						links.push({ id: parent.node.id + '-' + node.id, from: card, to: parent, color: node.color ? node.color : 'brand' });
					}

					return start;
				};

				for(const node of this.items)
				{
					walk(node, 0, null);
				}

				const width = Math.max(...cards.map((card) => card.x)) + WIDTH + PAD;
				const height = Math.max(...cards.map((card) => card.y)) + HEIGHT + PAD;

				for(const link of links)
				{
					const x1 = link.to.x + WIDTH;
					const y1 = link.to.y + HEIGHT / 2;
					const x2 = link.from.x;
					const y2 = link.from.y + HEIGHT / 2;
					const bend = (x2 - x1) / 2;

					link.d = 'M ' + x1 + ' ' + y1 + ' C ' + (x1 + bend) + ' ' + y1 + ', ' + (x2 - bend) + ' ' + y2 + ', ' + x2 + ' ' + y2;
				}

				return { cards, links, width, height };
			};

			this.pick = (node) =>
			{
				this.current = node.id;

				if(this._open)
				{
					this._open({ value: node });
				}
			};

			this.stamp = (card) =>
			{
				const list = ['card', card.node.color ? card.node.color : 'brand'];

				if(card.node.id === this.current)
				{
					list.push('active');
				}

				return list.join(' ');
			};

			this.place = (card) =>
			{
				return 'left: ' + card.x + 'px; top: ' + card.y + 'px; width: ' + WIDTH + 'px; height: ' + HEIGHT + 'px;';
			};

			this.frame = () =>
			{
				const { width, height } = this.layout();

				return 'width: ' + width + 'px; height: ' + height + 'px;';
			};

			return /* html */ `
				<div :class="'box bg-' + background + ' ot-scrollbar'">
					<div ot-if="!items.length" class="void">{{ empty }}</div>
					<div ot-if="items.length" class="plane" :style="frame()">
						<svg class="wires" :style="frame()">
							<path ot-for="link in layout().links" :ot-key="link.id" :class="link.color" :d="link.d"></path>
						</svg>
						<div ot-for="card in layout().cards" :ot-key="card.node.id" :class="stamp(card)" :style="place(card)" ot-click="() => pick(card.node)">
							<div class="cover" :style="card.node.cover ? 'background-image: url(' + card.node.cover + ')' : ''"></div>
							<span class="tile"><i>{{ card.node.icon ? card.node.icon : 'circle' }}</i></span>
							<div class="words">
								<span class="title">{{ card.node.title }}</span>
								<span ot-if="card.node.subtitle" class="subtitle">{{ card.node.subtitle }}</span>
							</div>
							<div class="side">
								<span ot-if="card.node.badge" class="chip">{{ card.node.badge }}</span>
								<span ot-if="card.node.meta" class="meta">{{ card.node.meta }}</span>
							</div>
						</div>
					</div>
				</div>
			`;
		}
	});
});
