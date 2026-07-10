onetype.AddonReady('ui.dashboard', (dashboard) =>
{
	dashboard.widgets.Item({
		id: 'developer-activity',
		title: 'Recent activity',
		icon: 'history',
		type: 'timeline',
		section: 'developer-operations',
		span: 6,
		condition: { app: ['developer'] },
		data: {
			events: [
				{ icon: 'rocket_launch', title: 'Production deploy finished', detail: 'Build #214, 38s', time: '4m ago', color: 'green' },
				{ icon: 'extension', title: 'Package forms updated', detail: '1.2.0 to 1.3.0', time: '26m ago', color: 'blue' },
				{ icon: 'person_add', title: 'New collaborator joined', detail: 'ana@studio.com accepted the invite', time: '1h ago', color: 'orange' },
				{ icon: 'error', title: 'Build failed on preview', detail: 'Missing env variable, retried', time: '2h ago', color: 'red' }
			]
		}
	});
});
