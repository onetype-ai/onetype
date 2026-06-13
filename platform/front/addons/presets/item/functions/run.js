presets.Fn('item.run', async function(item, data = {})
{
	const config = item.Get('config');
	const input = Object.keys(config).length ? onetype.DataDefine(data, config, true) : {};

	return await item.Get('callback')(input);
});
