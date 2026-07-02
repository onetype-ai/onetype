import onetype from '@onetype/framework';
import projects from '#shared/system/projects/addon.js';

onetype.MiddlewareIntercept('servers.http.request', async (middleware) =>
{
	const http = middleware.value;

	http.state.project = null;

	const project = await projects.Find()
		.filter('id', '1')
		.filter('deleted_at', null, 'NULL')
		.one();

	if(project)
	{
		http.state.project = project.GetData();
	}

	await middleware.next();
});
