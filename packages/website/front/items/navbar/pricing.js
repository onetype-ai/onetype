onetype.AddonReady('ui.navbar', (navbar) =>
{
	navbar.Item({
		id: 'website-pricing',
		order: 4,
		position: 'center',
		name: 'Pricing',
		condition: { app: ['website'] },
		onClick: () =>
		{
			const section = document.getElementById('site-pricing');

			section && section.scrollIntoView({ behavior: 'smooth' });
		}
	});
});
