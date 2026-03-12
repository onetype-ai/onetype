commands.ItemOn('add', (item) =>
{
	const meta = item.Get('meta');

	agents.Item({
		id: item.Get('id'),
		name: item.Get('id'),
		description: item.Get('description'),
		instructions: meta.instructions,
		input: onetype.DataConfig(item.Get('in') || {}),
		output: onetype.DataConfig(item.Get('out')),
		onAfter: async ({input, output, payload}) => 
		{
			const results = await item.Fn('run', input);

			if(results.code === 200)
			{
				Object.assign(output, results.data);
			}
			else 
			{
				throw new Error(results.message);
			}
		}
	});
});
