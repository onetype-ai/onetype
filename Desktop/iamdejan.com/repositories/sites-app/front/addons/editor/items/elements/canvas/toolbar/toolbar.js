elements.ItemAdd({
	id: 'editor-toolbar',
	icon: 'toolbar',
	name: 'Editor Toolbar',
	description: 'Top toolbar for the editor canvas.',
	category: 'Editor',
	author: 'OneType',
	config: {
		zoom: {
			type: 'number',
			value: 100
		},
		viewport: {
			type: 'string',
			value: 'desktop'
		},
		site: {
			type: 'object',
			value: {}
		},
		_zoom: {
			type: 'function'
		},
		_viewport: {
			type: 'function'
		}
	},
	render: function()
	{
		this.viewports = [
			{ id: 'desktop', icon: 'computer', width: 1440 },
			{ id: 'tablet', icon: 'tablet', width: 768 },
			{ id: 'mobile', icon: 'phone_iphone', width: 390 }
		];

		this.select = (id) =>
		{
			if(this._viewport)
			{
				this._viewport(id);
			}
		};

		this.zoomIn = () =>
		{
			if(this._zoom && this.zoom < 200)
			{
				this._zoom(this.zoom + 10);
			}
		};

		this.zoomOut = () =>
		{
			if(this._zoom && this.zoom > 25)
			{
				this._zoom(this.zoom - 10);
			}
		};

		this.reset = () =>
		{
			if(this._zoom)
			{
				this._zoom(100);
			}
		};

		return `
			<div class="holder">
				<div class="left">
					<a class="back" href="/">
						<i>arrow_back</i>
					</a>
					<span ot-if="site.name" class="name">{{ site.name }}</span>
				</div>
				<div class="center">
					<div class="viewports">
						<button ot-for="item in viewports" :class="'device' + (viewport === item.id ? ' active' : '')" ot-click="() => select(item.id)">
							<i>{{ item.icon }}</i>
						</button>
					</div>
					<div class="separator"></div>
					<div class="zoom">
						<button class="control" ot-click="zoomOut"><i>remove</i></button>
						<span class="value" ot-click="reset">{{ zoom }}%</span>
						<button class="control" ot-click="zoomIn"><i>add</i></button>
					</div>
				</div>
				<div class="right">
					<button class="action"><i>undo</i></button>
					<button class="action"><i>redo</i></button>
					<div class="separator"></div>
					<e-form-button text="Publish" icon="rocket_launch" :variant="['brand', 'size-s']"></e-form-button>
				</div>
			</div>
		`;
	}
});
