elements.ItemAdd({
	id: 'collections-import',
	icon: 'upload',
	name: 'Collections Import',
	description: 'Import collections from a JSON export file.',
	category: 'Collections',
	author: 'OneType',
	metadata: { addon: 'collections' },
	render: function()
	{
		this.dragging = false;
		this.result = null;

		const read = (file) =>
		{
			const reader = new FileReader();

			reader.onload = async () =>
			{
				try
				{
					const payload = JSON.parse(reader.result);
					const outcome = await $ot.command('collections:import', { collections: payload.collections || [] });

					this.result = outcome.data ? outcome.message : outcome.message;
				}
				catch(error)
				{
					$ot.float.toast({ title: 'Collections', message: 'That file is not a valid export: ' + error.message, type: 'error' });
				}
			};

			reader.readAsText(file);
		};

		this.pick = () =>
		{
			const input = this.Element.querySelector('input');

			input && input.click();
		};

		this.change = ({ event }) =>
		{
			event.target.files.length && read(event.target.files[0]);
			event.target.value = '';
		};

		this.over = () =>
		{
			this.dragging = true;
		};

		this.leave = () =>
		{
			this.dragging = false;
		};

		this.drop = ({ event }) =>
		{
			this.dragging = false;
			event.dataTransfer.files.length && read(event.dataTransfer.files[0]);
		};

		return `
			<div class="box">
				<div class="card">
					<div class="tile"><i>upload</i></div>
					<h1>Import</h1>
					<p>Drop a collections export here, or pick a JSON file. Existing collections are skipped, nothing gets overwritten.</p>
					<div :class="dragging ? 'zone dragging' : 'zone'" ot-click="pick" ot-dragover="over" ot-dragleave="leave" ot-drop="drop">
						<i>place_item</i>
						<span>Drop the file here or click to browse</span>
					</div>
					<div ot-if="result" class="result">{{ result }}</div>
					<input type="file" accept=".json,application/json" ot-change="change">
				</div>
			</div>
		`;
	}
});
