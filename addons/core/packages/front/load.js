$ot.platform.packages = {
	limits: (slug) =>
	{
		return $ot.platform.packages.one(slug)?.Get('limits');
	},
	one: (slug) =>
	{
		return Object.values(packages.Items()).find((item) => item.Get('slug') === slug);
	},
	many: () =>
	{
		return Object.values(packages.Items());
	}
};
