elements.ItemAdd({
	id: 'editor-panel',
	icon: 'tune',
	name: 'Editor Panel',
	description: 'Right sidebar panel for section and element settings.',
	category: 'Editor',
	author: 'OneType',
	config: {
		section: {
			type: 'object',
			value: null
		},
		element: {
			type: 'object',
			value: {}
		},
		schema: {
			type: 'object',
			value: {}
		},
		_update: {
			type: 'function'
		},
		_edit: {
			type: 'function'
		},
		_delete: {
			type: 'function'
		},
		_close: {
			type: 'function'
		},
		_back: {
			type: 'function'
		}
	},
	render: function()
	{
		this.open = () =>
		{
			return this.section !== null;
		};

		this.mode = () =>
		{
			if(this.element && this.element.id)
			{
				return 'element';
			}

			return 'section';
		};

		this.title = () =>
		{
			if(this.element && this.element.id)
			{
				return this.element.type.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
			}

			return 'Section';
		};

		this.close = () =>
		{
			if(this._close)
			{
				this._close();
			}
		};

		this.back = () =>
		{
			if(this._back)
			{
				this._back();
			}
		};

		this.update = (key, value) =>
		{
			if(this._update && this.section)
			{
				this._update(this.section.id, key, value);
			}
		};

		this.remove = () =>
		{
			if(this._delete && this.element)
			{
				this._delete(this.element.id);
			}
		};

		this.edit = (elementId, key, value) =>
		{
			if(this._edit)
			{
				this._edit(elementId, key, value);
			}
		};

		return `
			<div :class="'holder' + (open() ? ' open' : '')">
				<div ot-if="open()" class="content">
					<div class="header">
						<div class="left">
							<button ot-if="mode() === 'element'" class="back" ot-click="back"><i>arrow_back</i></button>
							<span class="title">{{ title() }}</span>
						</div>
						<div class="right">
							<button ot-if="mode() === 'element'" class="action danger" ot-click="remove"><i>delete</i></button>
							<button class="close" ot-click="close"><i>close</i></button>
						</div>
					</div>
					<div class="body">
						<div ot-if="mode() === 'section'">
							<e-panel-columns :section="section" :_update="update"></e-panel-columns>
							<e-panel-spacing :section="section" :_update="update"></e-panel-spacing>
							<e-panel-background :section="section" :_update="update"></e-panel-background>
							<e-panel-border :section="section" :_update="update"></e-panel-border>
						</div>
						<div ot-if="mode() === 'element'">
							<e-panel-element :element="element" :schema="schema" :_edit="edit"></e-panel-element>
						</div>
					</div>
				</div>
			</div>
		`;
	}
});
