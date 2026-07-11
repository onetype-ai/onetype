onetype.AddonReady('ui.navbar', (navbar) =>
{
	navbar.Item({
		id: 'website-ai',
		order: 3,
		position: 'center',
		name: 'AI',
		condition: { app: ['website'] },
		onClick: () =>
		{
			const section = document.getElementById('site-ai');

			section && section.scrollIntoView({ behavior: 'smooth' });
		}
	});
});
