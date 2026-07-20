$ot.system = $ot.system || {};

$ot.system.packages = {
	limits: (slug) =>
	{
		const item = Object.values(packages.Items()).find((candidate) => candidate.Get('slug') === slug);

		return item ? item.Get('limits') : {};
	}
};
