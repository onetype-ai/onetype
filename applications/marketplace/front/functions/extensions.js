/* TEMP DEMO — fake extensions until the catalog drives the marketplace. */

const EXTENSIONS = [
	{ id: 'sitemap', name: 'Sitemap Generator', icon: 'account_tree', color: 'blue', description: 'Auto-build and submit XML sitemaps on every publish.', author: 'OneType', official: true, rating: 4.9, reviews: 312, price: 'Free', installed: true },
	{ id: 'redirects', name: 'Smart Redirects', icon: 'alt_route', color: 'green', description: 'Manage 301s and catch broken links before visitors do.', author: 'OneType', official: true, rating: 4.8, reviews: 198, price: 'Free', installed: false },
	{ id: 'gtm', name: 'Tag Manager', icon: 'sell', color: 'orange', description: 'Drop in Google Tag Manager without touching code.', author: 'Pixel Labs', official: false, rating: 4.6, reviews: 1240, price: 'Free', installed: false },
	{ id: 'chat', name: 'Live Chat', icon: 'chat', color: 'brand', description: 'Talk to visitors in real time with a lightweight widget.', author: 'Converse', official: false, rating: 4.4, reviews: 870, price: '$9/mo', installed: false },
	{ id: 'reviews', name: 'Review Widgets', icon: 'reviews', color: 'orange', description: 'Show star ratings and testimonials pulled from any source.', author: 'Trustbar', official: false, rating: 4.7, reviews: 530, price: 'Free plan', installed: false },
	{ id: 'ab', name: 'A/B Testing', icon: 'science', color: 'red', description: 'Split traffic and measure which version converts better.', author: 'Splitwise', official: false, rating: 4.5, reviews: 410, price: '$19/mo', installed: false },
	{ id: 'cookies', name: 'Cookie Consent', icon: 'cookie', color: 'blue', description: 'GDPR-ready consent banner with granular controls.', author: 'Privacy Co', official: false, rating: 4.3, reviews: 290, price: 'Free', installed: false },
	{ id: 'newsletter', name: 'Newsletter', icon: 'mail', color: 'green', description: 'Capture subscribers and sync to your email provider.', author: 'Mailroom', official: false, rating: 4.6, reviews: 640, price: 'Free plan', installed: false }
];

marketplace.Fn('extensions', function(filters = {})
{
	const query = (filters.query || '').trim().toLowerCase();

	return EXTENSIONS.filter((entry) =>
	{
		if(query)
		{
			return (entry.name + ' ' + entry.description + ' ' + entry.author).toLowerCase().includes(query);
		}

		return true;
	});
});
