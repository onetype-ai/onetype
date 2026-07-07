onetype.AddonReady('ui.dashboard', (dashboard) =>
{
	dashboard.widgets.Item({
		id: 'mesh-checkpoints',
		title: 'Recent checkpoints',
		description: 'Eval gate results',
		icon: 'model_training',
		type: 'table',
		section: 'knowledge',
		span: 12,
		condition: { app: ['mesh'] },
		data: {
			columns: [
				{ key: 'name', label: 'Checkpoint', align: 'left' },
				{ key: 'eval', label: 'Eval score', align: 'right' },
				{ key: 'delta', label: 'Delta', align: 'right' },
				{ key: 'status', label: 'Gate', align: 'right', badge: true }
			],
			rows: [
				{ name: 'qwen3.5-4b-step-1200', eval: '0.61', delta: '+0.04', status: 'promoted', statusColor: 'green' },
				{ name: 'qwen3.5-4b-step-1100', eval: '0.57', delta: '+0.02', status: 'promoted', statusColor: 'green' },
				{ name: 'qwen3.5-4b-step-1000', eval: '0.55', delta: '-0.01', status: 'rejected', statusColor: 'red' }
			]
		}
	});
});
