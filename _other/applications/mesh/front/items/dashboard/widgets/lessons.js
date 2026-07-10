onetype.AddonReady('ui.dashboard', (dashboard) =>
{
	dashboard.widgets.Item({
		id: 'mesh-lessons',
		title: 'Lessons',
		description: 'Distilled and deduped',
		icon: 'school',
		type: 'numbers',
		section: 'system',
		span: 3,
		condition: { app: ['mesh'] },
		data: async () =>
		{
			return {
				metrics: [
					{ label: 'Recipes', value: '842' },
					{ label: 'Warnings', value: '317', delta: '-2', direction: 'down' }
				]
			};
		}
	});
});
