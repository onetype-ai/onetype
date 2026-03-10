elements.ItemAdd({
	id: 'navbar',
	icon: 'menu',
	name: 'Navbar',
	description: 'App navbar with navigation items.',
	category: 'App',
	author: 'OneType',
	render: function()
	{
		this.items = [
			{ icon: 'language', label: 'Sites', href: '/', match: ['/'], position: 'left' },
			{ icon: 'palette', label: 'Themes', href: '/themes', match: ['/themes'], position: 'left' },
			this.state.user
				? { icon: 'logout', label: 'Sign Out', href: 'https://auth.onetype.ai/logout?return=https://sites.onetype.ai', position: 'right' }
				: { icon: 'login', label: 'Sign In', href: 'https://auth.onetype.ai?return=https://sites.onetype.ai', position: 'right' }
		];

		return `<e-navigation-navbar :items="items"></e-navigation-navbar>`;
	}
});
