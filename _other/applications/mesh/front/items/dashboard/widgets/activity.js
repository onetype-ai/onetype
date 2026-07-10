onetype.AddonReady('ui.dashboard', (dashboard) =>
{
	dashboard.widgets.Item({
		id: 'mesh-activity',
		title: 'Recent activity',
		icon: 'history',
		type: 'timeline',
		section: 'cloud',
		span: 12,
		condition: { app: ['mesh'] },
		data: {
			events: [
				{ icon: 'check', title: 'Checkpoint step-1200 promoted', detail: 'Eval score 0.61, +0.04 over previous', time: '2m ago', color: 'green' },
				{ icon: 'school', title: 'Distilled 48 new lessons', detail: '31 recipes, 17 warnings', time: '14m ago', color: 'blue' },
				{ icon: 'bolt', title: 'Training batch finished', detail: '1,284 episodes, 61% verified', time: '38m ago', color: 'orange' },
				{ icon: 'error', title: 'Sandbox reset failed', detail: 'Project template out of sync, retried', time: '1h ago', color: 'red' }
			]
		}
	});
});
