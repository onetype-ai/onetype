import commands from '@onetype/framework/commands';

commands.Item({
	id: 'crawl',
	exposed: true,
	method: 'GET',
	endpoint: '/crawl',
	in: {
		url: ['string', null, true]
	},
	out: {
		html: ['string', null, true]
	},
	callback: async function(properties, resolve, reject)
	{
		try
		{
			const response = await fetch(properties.url);
			let html = await response.text();

			html = html.replace(/<script[\s\S]*?<\/script>/gi, '');
			html = html.replace(/<style[\s\S]*?<\/style>/gi, '');
			html = html.replace(/<noscript[\s\S]*?<\/noscript>/gi, '');
			html = html.replace(/<svg[\s\S]*?<\/svg>/gi, '');
			html = html.replace(/<!--[\s\S]*?-->/g, '');
			html = html.replace(/\s+/g, ' ');
			html = html.trim();

			if (html.length > 160000)
			{
				html = html.substring(0, 160000);
			}

			resolve({ html });
		}
		catch (e)
		{
			reject(e.message);
		}
	}
});
