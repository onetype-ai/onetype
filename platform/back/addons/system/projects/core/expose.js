import projects from '#shared/system/projects/addon.js';

projects.Expose({
	filter: ['id', 'team_id'],
	sort: ['name', 'created_at', 'updated_at'],
	select: [
		'id', 'team_id', 'name', 'description', 'color', 'config', 'updated_at', 'created_at'
	],
	find: function(query)
	{
		if(!this.http.state.user)
		{
			return 'Login required.';
		}

		query.filter('deleted_at', null, 'NULL');
		query.filter('team_id', this.http.state.user.team.id);

		return true;
	}
});
