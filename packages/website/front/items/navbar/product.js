onetype.AddonReady('ui.navbar', (navbar) =>
{
	navbar.Item({
		id: 'website-product',
		order: 1,
		position: 'center',
		name: 'Product',
		condition: { app: ['website'] },
		onClick: () =>
		{
			const section = document.getElementById('site-product');

			section && section.scrollIntoView({ behavior: 'smooth' });
		}
	});
});
