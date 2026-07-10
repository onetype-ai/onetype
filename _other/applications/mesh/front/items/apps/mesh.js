onetype.AddonReady('ui.apps', (apps) =>
{
	apps.Item({
		id: 'mesh',
		name: 'Mesh',
		icon: 'hub',
		color: 'rgba(52, 211, 153, 1)',
		description: 'Self improving AI system: episodes, lessons, training and evals.',
		order: 3,
		links: [
			{
				icon: 'dashboard',
				name: 'Overview',
				onClick: () => $ot.navigate({ app: 'mesh', mode: 'overview' })
			},
			{
				icon: 'model_training',
				name: 'Training',
				onClick: () => $ot.navigate({ app: 'mesh', mode: 'training' })
			}
		]
	});
});
