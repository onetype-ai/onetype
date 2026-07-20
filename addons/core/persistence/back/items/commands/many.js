import commands from '@onetype/framework/commands';
import persistence from '#persistence/addon.js';

commands.Item({
	id: 'persistence:many',
	exposed: true,
	method: 'GET',
	endpoint: '/api/persistence',
	description: 'Answers with every persisted value of the signed in user as one key to value map. The front loads it once on boot.',
	metadata: { addon: 'system.persistence' },
	condition: function()
	{
		if(!this.http.state.user)
		{
			return 'Sign in to read persisted values.';
		}
	},
	in: {},
	out: {
		values: {
			type: 'object',
			required: true,
			description: 'Every persisted value of the user, keyed by its namespaced key.'
		}
	},
	callback: async function(properties, resolve)
	{
		const result = await persistence.Find()
			.filter('user_id', this.http.state.user.Get('id'))
			.limit(10000)
			.plain();

		const values = {};

		for(const item of result.items)
		{
			values[item.key] = item.value;
		}

		resolve({ values });
	}
});
