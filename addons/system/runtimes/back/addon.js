import onetype from '@onetype/framework';

const runtimes = onetype.Addon('runtimes', (addon) =>
{
	addon.Field('slug', {
		type: 'string',
		required: true,
		description: 'Stable text key like core or site. Domains map to a runtime by slug, packages declare which runtimes they belong to.'
	});

	addon.Field('name', {
		type: 'string',
		required: true,
		description: 'Runtime name shown when a domain picks which runtime it serves.'
	});

	addon.Field('description', {
		type: 'string',
		description: 'Short one line description of what this runtime loads and what it is for.'
	});
});

export default runtimes;
