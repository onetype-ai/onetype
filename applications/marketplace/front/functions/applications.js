/* TEMP DEMO — fake applications until the catalog drives the marketplace. */

const APPLICATIONS = [
	{ slug: 'builder', name: 'Builder', icon: 'design_services', color: 'rgba(226, 112, 85, 1)', description: 'Visual page editor with canvas, elements and styles.', is_global: true, installed: true },
	{ slug: 'collections', name: 'Collections', icon: 'database', color: 'rgba(56, 189, 248, 1)', description: 'Structured content, fields and relations for your site.', is_global: true, installed: true },
	{ slug: 'workflows', name: 'Workflows', icon: 'account_tree', color: 'rgba(52, 211, 153, 1)', description: 'Automations with triggers and actions, no code needed.', is_global: false, installed: false },
	{ slug: 'forms', name: 'Forms', icon: 'list_alt', color: 'rgba(251, 146, 60, 1)', description: 'Collect submissions with validation and notifications.', is_global: false, installed: false },
	{ slug: 'analytics', name: 'Analytics', icon: 'monitoring', color: 'rgba(168, 85, 247, 1)', description: 'Traffic, events and conversions for every page.', is_global: false, installed: false },
	{ slug: 'seo', name: 'SEO', icon: 'travel_explore', color: 'rgba(244, 63, 94, 1)', description: 'Meta tags, sitemaps and previews for search engines.', is_global: false, installed: false },
	{ slug: 'media', name: 'Media', icon: 'perm_media', color: 'rgba(99, 102, 241, 1)', description: 'Upload, optimize and serve images and video.', is_global: false, installed: false },
	{ slug: 'commerce', name: 'Commerce', icon: 'shopping_cart', color: 'rgba(34, 197, 94, 1)', description: 'Products, carts and checkout for your store.', is_global: false, installed: false }
];

marketplace.Fn('applications', function(filters = {})
{
	const query = (filters.query || '').trim().toLowerCase();

	return APPLICATIONS.filter((entry) =>
	{
		if(query)
		{
			return (entry.name + ' ' + entry.slug + ' ' + entry.description).toLowerCase().includes(query);
		}

		return true;
	});
});
