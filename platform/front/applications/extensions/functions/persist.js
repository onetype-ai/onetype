extensions.Fn('persist', function()
{
	const installed = Object.values(this.Items()).filter((item) => item.Get('installed')).map((item) => item.Get('id'));

	$ot.settings.set('extensions.installed', installed);
});
