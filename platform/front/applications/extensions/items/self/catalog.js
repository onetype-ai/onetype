/* TEMP DEMO — marketplace catalog until the real registry lands. */

extensions.Item({ id: 'assistant', name: 'AI Assistant', icon: 'smart_toy', color: 'brand', description: 'Chat companion that learns you and runs workflows for real work.', author: 'OneType', official: true, category: 'AI', rating: 4.9, reviews: 412, price: 'Free', featured: true, installed: true });
extensions.Item({ id: 'explorer', name: 'Explorer', icon: 'search', color: 'brand', description: 'Universal search over apps, pages, commands and settings.', author: 'OneType', official: true, category: 'Navigation', rating: 4.8, reviews: 198, price: 'Free', featured: true, installed: true });
extensions.Item({ id: 'terminal', name: 'Terminal', icon: 'terminal', color: 'brand', description: 'Run and inspect every editor command from a console.', author: 'OneType', official: true, category: 'Developer', rating: 4.7, reviews: 156, price: 'Free', installed: true });
extensions.Item({ id: 'workflows', name: 'AI Workflows', icon: 'account_tree', color: 'brand', description: 'Autonomous task runners that build and change your site.', author: 'OneType', official: true, category: 'AI', rating: 4.9, reviews: 287, price: 'Free', featured: true, installed: true });
extensions.Item({ id: 'collaborators', name: 'Collaborators', icon: 'group', color: 'brand', description: 'Live cursors and presence for your whole team.', author: 'OneType', official: true, category: 'Team', rating: 4.6, reviews: 94, price: 'Free plan', installed: true });

extensions.Item({ id: 'seo-toolkit', name: 'SEO Toolkit', icon: 'travel_explore', color: 'green', description: 'Meta tags, sitemaps, redirects and audits in one place.', author: 'Rankify', category: 'SEO', rating: 4.8, reviews: 1240, price: 'Free plan', featured: true, trending: true });
extensions.Item({ id: 'newsletter', name: 'Newsletter', icon: 'mail', color: 'blue', description: 'Signup forms wired to your audience list with double opt in.', author: 'Sendwise', category: 'Marketing', rating: 4.7, reviews: 832, price: 'Free plan', trending: true });
extensions.Item({ id: 'analytics-lite', name: 'Analytics Lite', icon: 'monitoring', color: 'orange', description: 'Privacy friendly visitor stats without cookies.', author: 'Plausard', category: 'Analytics', rating: 4.9, reviews: 2103, price: 'Free', featured: true, trending: true });
extensions.Item({ id: 'stripe-payments', name: 'Stripe Payments', icon: 'credit_card', color: 'blue', description: 'Accept cards, wallets and subscriptions at checkout.', author: 'Stripe', category: 'Commerce', rating: 4.8, reviews: 3411, price: 'Free', featured: true });
extensions.Item({ id: 'instagram-feed', name: 'Instagram Feed', icon: 'photo_library', color: 'red', description: 'Show your latest posts in a grid or carousel.', author: 'Feedly Labs', category: 'Social', rating: 4.4, reviews: 671, price: '$5/mo' });
extensions.Item({ id: 'live-chat', name: 'Live Chat', icon: 'chat', color: 'green', description: 'Talk to visitors in real time, with offline inbox.', author: 'Chatterbox', category: 'Marketing', rating: 4.5, reviews: 945, price: '$9/mo', trending: true });
extensions.Item({ id: 'cookie-consent', name: 'Cookie Consent', icon: 'cookie', color: 'orange', description: 'GDPR and CCPA banner with granular consent.', author: 'Privacy Pro', category: 'Security', rating: 4.6, reviews: 1502, price: 'Free plan' });
extensions.Item({ id: 'multilang', name: 'Multilang', icon: 'translate', color: 'blue', description: 'Translate your site into any language with AI drafts.', author: 'Polyglot', category: 'Localization', rating: 4.7, reviews: 488, price: '$9/mo', trending: true });
extensions.Item({ id: 'image-cdn', name: 'Image CDN', icon: 'imagesmode', color: 'green', description: 'Automatic compression, resizing and modern formats.', author: 'Speedy', category: 'Performance', rating: 4.8, reviews: 766, price: 'Free plan' });
extensions.Item({ id: 'spam-shield', name: 'Form Spam Shield', icon: 'shield', color: 'red', description: 'Stops form spam without captchas.', author: 'Privacy Pro', category: 'Security', rating: 4.5, reviews: 389, price: 'Free' });
extensions.Item({ id: 'popups', name: 'Pop-ups & Banners', icon: 'ad_group', color: 'orange', description: 'Exit intent, timers and announcement bars.', author: 'Convertly', category: 'Marketing', rating: 4.2, reviews: 521, price: '$5/mo' });
extensions.Item({ id: 'reviews', name: 'Product Reviews', icon: 'reviews', color: 'orange', description: 'Collect and show reviews with photos and ratings.', author: 'Trustler', category: 'Commerce', rating: 4.6, reviews: 1093, price: 'Free plan' });
extensions.Item({ id: 'bookings', name: 'Bookings', icon: 'event_available', color: 'blue', description: 'Appointments, calendars and reminders for services.', author: 'Calendly Bros', category: 'Commerce', rating: 4.7, reviews: 856, price: '$19/mo' });
extensions.Item({ id: 'maps', name: 'Maps & Locations', icon: 'map', color: 'green', description: 'Beautiful maps with pins, routes and opening hours.', author: 'Cartograph', category: 'Content', rating: 4.3, reviews: 312, price: 'Free' });
extensions.Item({ id: 'video-embed', name: 'Video Embed', icon: 'smart_display', color: 'red', description: 'Lazy loaded video from any source, no layout shift.', author: 'Streamline', category: 'Media', rating: 4.5, reviews: 277, price: 'Free' });
extensions.Item({ id: 'custom-fonts', name: 'Custom Fonts', icon: 'custom_typography', color: 'blue', description: 'Upload and serve your brand fonts, subsetting included.', author: 'Typeworks', category: 'Content', rating: 4.6, reviews: 204, price: 'Free plan' });
extensions.Item({ id: 'ab-testing', name: 'A/B Testing', icon: 'science', color: 'orange', description: 'Split test sections and measure conversions.', author: 'Optimizely Jr', category: 'Analytics', rating: 4.4, reviews: 446, price: '$19/mo' });
extensions.Item({ id: 'backup-vault', name: 'Backup Vault', icon: 'cloud_done', color: 'green', description: 'Daily site backups with one click restore.', author: 'Safekeep', category: 'Developer', rating: 4.8, reviews: 633, price: '$5/mo', trending: true });

/* Overviews for the detail pages. */

const overviews = {
	'assistant': `## Your companion in the editor

The assistant lives in the right panel and talks like a person. It learns who you are, remembers your preferences and adapts to your style. Ask it anything about your site, or tell it what you want done.

When you ask for real work, it writes a precise goal and hands it to a workflow. You watch the progress live, task by task, and get an honest report back, in your language.

- Chats naturally and remembers your preferences
- Launches workflows for real building work
- Reports honestly, including failures
- Rate replies to improve it over time`,

	'workflows': `## Autonomous task runners

A workflow takes one goal and gets it done. It splits the goal into tasks, runs independent ones in parallel, verifies its own work with reading agents and recovers from failures on its own.

Every step is an agent call through the same commands you use, so the terminal logs everything and nothing happens off the rails.

- Parallel task execution with dependencies
- Self verification and recovery
- Honest summaries of what happened
- Powered by a local model, your data stays home`,

	'seo-toolkit': `## Everything search engines want

Meta titles and descriptions, open graph tags, sitemaps, redirects and canonical urls, all from one panel. Audits run on every publish and tell you exactly what to fix.

- Page level meta editing with previews
- Automatic sitemap generation
- Redirect manager with 301 and 302 support
- Publish audits with actionable fixes`,

	'analytics-lite': `## Numbers without the creep

Privacy friendly analytics with no cookies and no personal data. One lightweight script, a clean dashboard, and the answers you actually need: visitors, sources, top pages and goals.

- No cookie banner needed
- Realtime dashboard
- Goals and conversion tracking
- Owned by you, exportable anytime`,

	'stripe-payments': `## Take payments seriously

Connect your Stripe account and accept cards, wallets and subscriptions at checkout. Taxes, receipts and refunds are handled where they belong, in Stripe, while your site stays fast.

- Cards, Apple Pay, Google Pay
- One time and recurring payments
- Test mode for safe development
- Webhooks wired to your workflows`,

	'multilang': `## One site, every language

Add languages to your site and translate content side by side. AI drafts the first pass, you polish it. Visitors get the right language automatically with a clean switcher.

- AI translation drafts
- Side by side editing
- Automatic language detection
- Localized SEO metadata`
};

Object.entries(overviews).forEach(([id, overview]) =>
{
	const item = extensions.ItemGet(id);

	item && item.Set('overview', overview, false);
});
