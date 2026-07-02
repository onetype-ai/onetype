onetype.AddonReady('ui.navbar', (navbar) =>
{
	navbar.Item({
		id: 'assistants',
		order: 5,
		position: 'right',
		icon: 'smart_toy',
		tooltip: 'Assistant',
		onClick: () =>
		{
			$ot.ui.layouts.toggle('assistants');
		}
	});
});
