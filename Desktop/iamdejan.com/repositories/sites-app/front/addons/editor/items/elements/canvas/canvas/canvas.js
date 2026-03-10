elements.ItemAdd({
	id: 'editor-canvas',
	icon: 'dashboard',
	name: 'Editor Canvas',
	description: 'Main editor canvas with toolbar, rulers, grid, and viewports.',
	category: 'Editor',
	author: 'OneType',
	config: {
		site: {
			type: 'object',
			value: {}
		}
	},
	render: function()
	{
		this.zoom = 100;
		this.viewport = 'desktop';
		this.loading = true;
		this.scroll = 0;
		this.selected = null;
		this.selectedElement = '';
		this.picker = null;
		this.widths = { desktop: 1440, tablet: 768, mobile: 390 };

		/* Element schemas */
		this.schemas = {
			'hero-bold': {
				heading: { type: 'string', value: 'Build Something Amazing' },
				subheading: { type: 'string', value: 'Create stunning websites with zero code.' },
				button_label: { type: 'string', value: 'Get Started' },
				button_url: { type: 'string', value: '#' },
				variant: { type: 'array', value: ['brand', 'large'], options: ['brand', 'blue', 'green', 'red', 'neutral', 'small', 'medium', 'large'] },
				centered: { type: 'boolean', value: true }
			},
			'features-grid': {
				heading: { type: 'string', value: 'Features' },
				columns: { type: 'number', value: 3 },
				variant: { type: 'array', value: ['neutral'], options: ['brand', 'blue', 'green', 'neutral', 'compact', 'spacious'] },
				show_icons: { type: 'boolean', value: true }
			},
			'faq-fold': {
				heading: { type: 'string', value: 'Frequently Asked Questions' },
				variant: { type: 'array', value: ['neutral'], options: ['brand', 'blue', 'neutral', 'compact'] },
				open_first: { type: 'boolean', value: true }
			}
		};

		this.elementSchema = () =>
		{
			const element = this.selectedElementData();

			if(!element || !element.type)
			{
				return {};
			}

			return this.schemas[element.type] || {};
		};

		/* Dummy sections */
		this.sections = [
			{
				id: 's1',
				columns: [{ width: 1, elements: [
					{ id: 'e1', type: 'hero-bold', config: {} }
				] }],
				container: false,
				gap: 0,
				padding: { top: 0, right: 0, bottom: 0, left: 0 },
				margin: { top: 0, bottom: 0 },
				background: '',
				border: { top: '', bottom: '' }
			},
			{
				id: 's2',
				columns: [{ width: 1, elements: [
					{ id: 'e2', type: 'features-grid', config: {} }
				] }],
				container: false,
				gap: 0,
				padding: { top: 0, right: 0, bottom: 0, left: 0 },
				margin: { top: 0, bottom: 0 },
				background: '',
				border: { top: '', bottom: '' }
			},
			{
				id: 's3',
				columns: [{ width: 1, elements: [
					{ id: 'e3', type: 'faq-fold', config: {} }
				] }],
				container: false,
				gap: 0,
				padding: { top: 0, right: 0, bottom: 0, left: 0 },
				margin: { top: 0, bottom: 0 },
				background: '',
				border: { top: '', bottom: '' }
			}
		];

		this.width = () =>
		{
			return this.widths[this.viewport] || 1440;
		};

		this.setZoom = (value) =>
		{
			this.zoom = Math.max(25, Math.min(200, value));
		};

		this.setViewport = (id) =>
		{
			this.viewport = id;
		};

		this.wheel = (event) =>
		{
			if(event.ctrlKey || event.metaKey)
			{
				event.preventDefault();

				const delta = event.deltaY > 0 ? -5 : 5;

				this.setZoom(this.zoom + delta);
			}
		};

		/* Section management */

		this.selectSection = (id) =>
		{
			this.selected = id;
			this.selectedElement = '';
		};

		this.deselectAll = () =>
		{
			this.selected = null;
			this.selectedElement = '';
		};

		this.selectedSectionData = () =>
		{
			if(!this.selected)
			{
				return null;
			}

			return this.sections.find(section => section.id === this.selected) || null;
		};

		this.updateSection = (id, key, value) =>
		{
			const index = this.sections.findIndex(section => section.id === id);

			if(index === -1)
			{
				return;
			}

			this.sections = [...this.sections];
			this.sections[index] = { ...this.sections[index], [key]: value };
		};

		this.removeSection = (id) =>
		{
			this.sections = this.sections.filter(section => section.id !== id);

			if(this.selected === id)
			{
				this.selected = null;
				this.selectedElement = '';
			}
		};

		this.addSection = (afterId) =>
		{
			const id = 's' + Date.now();
			const section = {
				id: id,
				columns: [{ width: 1, elements: [] }],
				container: true,
				gap: 16,
				padding: { top: 48, right: 24, bottom: 48, left: 24 },
				margin: { top: 0, bottom: 0 },
				background: '#ffffff',
				border: { top: '', bottom: '' }
			};

			if(afterId)
			{
				const index = this.sections.findIndex(s => s.id === afterId);

				this.sections = [...this.sections];
				this.sections.splice(index + 1, 0, section);
			}
			else
			{
				this.sections = [...this.sections, section];
			}

			this.selected = id;
			this.selectedElement = '';
		};

		/* Element management */

		this.selectElement = (elementId, sectionId) =>
		{
			this.selectedElement = elementId;
			this.selected = sectionId;
		};

		this.selectedElementData = () =>
		{
			if(!this.selectedElement || !this.selected)
			{
				return {};
			}

			const section = this.sections.find(s => s.id === this.selected);

			if(!section)
			{
				return {};
			}

			for(const column of section.columns)
			{
				if(!column.elements)
				{
					continue;
				}

				const element = column.elements.find(e => e.id === this.selectedElement);

				if(element)
				{
					return element;
				}
			}

			return {};
		};

		this.updateElement = (elementId, key, value) =>
		{
			const sectionIndex = this.sections.findIndex(s =>
			{
				return s.columns.some(c => c.elements && c.elements.some(e => e.id === elementId));
			});

			if(sectionIndex === -1)
			{
				return;
			}

			this.sections = [...this.sections];
			const section = { ...this.sections[sectionIndex] };
			section.columns = section.columns.map(column =>
			{
				if(!column.elements)
				{
					return column;
				}

				return {
					...column,
					elements: column.elements.map(element =>
					{
						if(element.id !== elementId)
						{
							return element;
						}

						return { ...element, [key]: value };
					})
				};
			});

			this.sections[sectionIndex] = section;
		};

		this.removeElement = (elementId) =>
		{
			const sectionIndex = this.sections.findIndex(s =>
			{
				return s.columns.some(c => c.elements && c.elements.some(e => e.id === elementId));
			});

			if(sectionIndex === -1)
			{
				return;
			}

			this.sections = [...this.sections];
			const section = { ...this.sections[sectionIndex] };
			section.columns = section.columns.map(column =>
			{
				if(!column.elements)
				{
					return column;
				}

				return {
					...column,
					elements: column.elements.filter(e => e.id !== elementId)
				};
			});

			this.sections[sectionIndex] = section;

			if(this.selectedElement === elementId)
			{
				this.selectedElement = '';
			}
		};

		this.openPicker = (sectionId, columnIndex) =>
		{
			this.picker = { sectionId: sectionId, columnIndex: columnIndex };
		};

		this.closePicker = () =>
		{
			this.picker = null;
		};

		this.addElement = (type, config) =>
		{
			if(!this.picker)
			{
				return;
			}

			const sectionIndex = this.sections.findIndex(s => s.id === this.picker.sectionId);

			if(sectionIndex === -1)
			{
				return;
			}

			const elementId = 'e' + Date.now();

			this.sections = [...this.sections];
			const section = { ...this.sections[sectionIndex] };
			section.columns = [...section.columns];

			const column = { ...section.columns[this.picker.columnIndex] };
			column.elements = [...(column.elements || []), { id: elementId, type: type, config: config }];

			section.columns[this.picker.columnIndex] = column;
			this.sections[sectionIndex] = section;

			this.picker = null;
			this.selectedElement = elementId;
			this.selected = section.id;
		};

		setTimeout(() => { this.loading = false; }, 2500);

		return `
			<div class="holder">
				<e-editor-loader ot-if="loading"></e-editor-loader>
				<e-editor-toolbar :zoom="zoom" :viewport="viewport" :site="site" :_zoom="setZoom" :_viewport="setViewport"></e-editor-toolbar>
				<div class="workspace">
					<e-editor-layers :sections="sections" :selected="selected || ''" :active="selectedElement" :_section="selectSection" :_element="selectElement"></e-editor-layers>
					<div class="canvas">
						<div class="corner"></div>
						<e-editor-ruler direction="horizontal" :visible="true" :zoom="zoom" :scroll="scroll"></e-editor-ruler>
						<e-editor-ruler direction="vertical" :visible="true" :zoom="zoom" :scroll="scroll"></e-editor-ruler>
						<div class="area" ot-wheel.prevent="wheel" ot-click="deselectAll">
							<e-editor-grid :visible="true" :zoom="zoom"></e-editor-grid>
							<div class="viewports">
								<e-editor-viewport :width="width()" :zoom="zoom" :label="viewport">
									<div slot="content" class="sections">
										<e-editor-section ot-for="section in sections" :section="section" :selected="selected === section.id" :active="selectedElement" :_select="selectSection" :_update="updateSection" :_remove="removeSection" :_add="addSection" :_choose="selectElement" :_picker="openPicker"></e-editor-section>
										<div class="add-first" ot-if="!sections.length" ot-click.stop="() => addSection(null)">
											<i>add_circle_outline</i>
											<span>Add Section</span>
										</div>
									</div>
								</e-editor-viewport>
							</div>
						</div>
					</div>
					<e-editor-panel :section="selectedSectionData()" :element="selectedElementData()" :schema="elementSchema()" :_update="updateSection" :_edit="updateElement" :_delete="removeElement" :_close="deselectAll" :_back="() => { selectedElement = ''; }"></e-editor-panel>
				</div>
				<e-editor-picker :visible="picker !== null" :_pick="addElement" :_close="closePicker"></e-editor-picker>
			</div>
		`;
	}
});
