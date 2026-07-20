import commands from '@onetype/framework/commands';
import persistence from '#persistence/addon.js';

commands.Item({
	id: 'persistence:set',
	exposed: true,
	method: 'POST',
	endpoint: '/api/persistence/set',
	description: 'Writes a batch of values for the signed in user. Existing keys update, new keys insert, a null value removes the key.',
	metadata: { addon: 'system.persistence' },
	condition: function()
	{
		if(!this.http.state.user)
		{
			return 'Sign in to persist values.';
		}
	},
	in: {
		values: {
			type: 'object',
			required: true,
			description: 'Values to write, keyed by their namespaced key. A null value removes the key.'
		}
	},
	out: {
		count: {
			type: 'number',
			required: true,
			description: 'How many keys were written or removed.'
		}
	},
	callback: async function(properties, resolve)
	{
		const user = this.http.state.user.Get('id');
		let count = 0;

		for(const [key, value] of Object.entries(properties.values))
		{
			const existing = await persistence.Find().filter('user_id', user).filter('key', key).one();

			if(value === null)
			{
				existing && await existing.Delete();
			}
			else if(existing)
			{
				existing.Set('value', value);
				existing.Set('updated_at', new Date().toISOString());
				await existing.Update();
			}
			else
			{
				const item = persistence.Item({
					user_id: user,
					key: key,
					value: value,
					created_at: new Date().toISOString()
				}, null, true, false);

				await item.Create();
			}

			count++;
		}

		resolve({ count }, count + (count === 1 ? ' value' : ' values') + ' written.');
	}
});
