pages.Item({
	id: 'home',
	route: '/',
	title: 'OneType Sites',
	grid: {
		template: '"navbar navbar" "rail workspace" "rail status"',
		columns: '52px 1fr',
		rows: '48px 1fr 26px',
		gap: '0'
	},
	areas: {
		navbar: function()
		{
			return `<div style="height: 100%; width: 100%; background: var(--ot-bg-2); border-bottom: 1px solid var(--ot-bg-2-border);"></div>`;
		},
		rail: function()
		{
			return `<e-bar></e-bar>`;
		},
		workspace: function()
		{
			return `<e-layout></e-layout>`;
		},
		status: function()
		{
			return `<e-status></e-status>`;
		}
	}
});
