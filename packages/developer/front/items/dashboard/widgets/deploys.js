onetype.AddonReady('ui.dashboard', (dashboard) =>
{
	dashboard.widgets.Item({
		id: 'developer-deploys',
		title: 'Recent deploys',
		description: 'Last builds across environments',
		icon: 'rocket_launch',
		type: 'table',
		section: 'developer-operations',
		span: 6,
		condition: { app: ['developer'] },
		data: {
			columns: [
				{ key: 'build', label: 'Build', align: 'left' },
				{ key: 'environment', label: 'Environment', align: 'left' },
				{ key: 'duration', label: 'Duration', align: 'right' },
				{ key: 'status', label: 'Status', align: 'right', badge: true }
			],
			rows: [
				{ build: '#214', environment: 'production', duration: '38s', status: 'live', statusColor: 'green' },
				{ build: '#213', environment: 'preview', duration: '41s', status: 'ready', statusColor: 'blue' },
				{ build: '#212', environment: 'preview', duration: '—', status: 'failed', statusColor: 'red' }
			]
		}
	});
});
