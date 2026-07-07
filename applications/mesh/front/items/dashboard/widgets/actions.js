onetype.AddonReady('ui.dashboard', (dashboard) =>
{
	dashboard.widgets.Item({
		id: 'mesh-actions',
		title: 'Quick actions',
		icon: 'bolt',
		type: 'actions',
		section: 'system',
		span: 5,
		condition: { app: ['mesh'] },
		data: {
			actions: [
				{ icon: 'play_arrow', label: 'Start training run', description: 'Kick off a new episode batch', color: 'green', onClick: () => $ot.float.toast({ title: 'Mesh', message: 'Training run started.', type: 'success' }) },
				{ icon: 'verified', label: 'Approve checkpoint', description: 'Promote the latest passing checkpoint', hint: '3', color: 'blue', onClick: () => $ot.float.toast({ title: 'Mesh', message: 'Checkpoint approved.', type: 'success' }) },
				{ icon: 'school', label: 'Distill lessons', description: 'Turn recent traces into Q&A', color: 'orange', onClick: () => $ot.float.toast({ title: 'Mesh', message: 'Distillation queued.' }) },
				{ icon: 'delete_sweep', label: 'Purge failed episodes', description: 'Remove unrecoverable runs', color: 'red', onClick: () => $ot.float.toast({ title: 'Mesh', message: 'Failed episodes purged.' }) }
			]
		}
	});
});
