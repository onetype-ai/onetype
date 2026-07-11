onetype.AddonReady('ui.navbar', (navbar) =>
{
	navbar.Item({
		id: 'website-packages',
		order: 2,
		position: 'center',
		name: 'Packages',
		condition: { app: ['website'] },
		onClick: () =>
		{
			const section = document.getElementById('site-packages');

			section && section.scrollIntoView({ behavior: 'smooth' });
		}
	});
});
