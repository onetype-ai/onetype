import commands from '@onetype/framework/commands';
import html from '@onetype/framework/html';
import runtimes from '#runtimes/addon.js';

commands.Item({
	id: 'html',
	exposed: true,
	silent: true,
	method: 'GET',
	endpoint: '*',
	type: 'HTML',
	callback: async function(properties, resolve)
	{
		const matched = runtimes.Fn('match', this.http.url.hostname, this.http.url.pathname);

		this.http.state.runtime = matched ? matched.Get('slug') : null;

		resolve(html.Fn('render', {
			head: () => `<script>window.__STATE__ = ${JSON.stringify(this.http.state)};</script>`
		}));
	}
});
