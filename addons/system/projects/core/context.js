$ot.projects = {
	active: () => projects.ItemGet($ot.modules.settings.get('projects.active', null)),
	open: (id) => $ot.command('projects:open', { id }),
	close: () => $ot.command('projects:close'),
	list: () => $ot.command('projects:list'),
	create: (data, options = {}) => $ot.command('projects:create', { ...data, options }),
	update: (data, options = {}) => $ot.command('projects:update', { ...data, options }),
	delete: (id, options = {}) => $ot.command('projects:delete', { id, options }),
	applications: {
		install: (slug, data = {}, options = {}) => $ot.command('projects:applications:install', { slug, data, options }),
		uninstall: (slug, options = {}) => $ot.command('projects:applications:uninstall', { slug, options })
	}
};
