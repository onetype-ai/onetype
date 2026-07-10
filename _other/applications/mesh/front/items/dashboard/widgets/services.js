onetype.AddonReady('ui.dashboard', (dashboard) =>
{
	dashboard.widgets.Item({
		id: 'mesh-services',
		title: 'Services',
		icon: 'dns',
		type: 'status',
		section: 'cloud',
		span: 4,
		condition: { app: ['mesh'] },
		data: {
			items: [
				{ label: 'Inference server', sublabel: 'vLLM · qwen3.5-4b', value: '42ms', status: 'up' },
				{ label: 'Postgres', sublabel: 'pgvector', value: '8ms', status: 'up' },
				{ label: 'Distiller worker', sublabel: 'queue depth 12', value: 'busy', status: 'warn' },
				{ label: 'Eval runner', sublabel: 'idle', value: '—', status: 'idle' }
			]
		}
	});
});
