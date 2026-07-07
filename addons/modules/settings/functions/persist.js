modules.settings.Fn('persist', function()
{
	const data = {};

	Object.values(this.Items()).forEach((item) =>
	{
		if(item.Get('storage') === 'local')
		{
			data[item.Get('id')] = item.Get('value');
		}
	});

	localStorage.setItem('onetype.settings', JSON.stringify(data));

	return data;
});
