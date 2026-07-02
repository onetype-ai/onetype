terminal.Fn('script', async function(text)
{
	const lines = text.split('\n').map((line) => line.trim()).filter((line) => line && !line.startsWith('#'));

	for(const line of lines)
	{
		await this.Fn('run', line);
	}
});
