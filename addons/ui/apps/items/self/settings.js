ui.apps.Item({
	id: 'settings',
	name: 'Settings',
	icon: 'settings',
	color: 'rgba(160, 163, 170, 1)',
	order: 2,
	render: () => `
		<div class="ot-flex-vertical ot-gap-l ot-p-m">
			<e-global-heading title="Workspace" description="Manage how your editor looks and behaves." element="h2" size="s"></e-global-heading>

			<e-form-field label="Project name" hint="Shown across the editor.">
				<e-form-input slot="input" value="OneType" icon="folder"></e-form-input>
			</e-form-field>

			<e-form-field label="Theme">
				<e-form-select slot="input" :value="'dark'" :options="[{ label: 'Dark', value: 'dark' }, { label: 'Light', value: 'light' }, { label: 'System', value: 'system' }]"></e-form-select>
			</e-form-field>

			<e-form-field label="Accent color">
				<e-form-color slot="input" value="rgba(226, 112, 85, 1)"></e-form-color>
			</e-form-field>

			<e-form-toggle label="Auto save" description="Save changes as you work." :value="true"></e-form-toggle>
			<e-form-toggle label="Show grid" description="Overlay a layout grid on the canvas."></e-form-toggle>
		</div>
	`
});
