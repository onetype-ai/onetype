import onetype from '@onetype/framework';

const persistence = onetype.Addon('system.persistence', (addon) =>
{
	addon.Table('persistence');

	addon.Field('id', {
		type: 'number',
		description: 'Unique entry id.'
	});

	addon.Field('user_id', {
		type: 'number',
		required: true,
		description: 'Id of the user the value belongs to.'
	});

	addon.Field('key', {
		type: 'string',
		required: true,
		description: 'Namespaced key of the value, like ui.dock.open or ui.canvas.state.'
	});

	addon.Field('value', {
		type: 'any',
		description: 'The persisted value, stored as JSON.'
	});

	addon.Field('updated_at', {
		type: 'string',
		metadata: { cast: 'date' },
		description: 'Timestamp of the last change.'
	});

	addon.Field('created_at', {
		type: 'string',
		metadata: { cast: 'date' },
		description: 'Timestamp of when the value was first written.'
	});

	addon.Schema('id bigserial primary key');
	addon.Schema('user_id bigint not null');
	addon.Schema('key varchar(255) not null');
	addon.Schema('value jsonb');
	addon.Schema('updated_at timestamptz not null default now()');
	addon.Schema('created_at timestamptz not null default now()');
	addon.Schema('unique (user_id, key)');
});

export default persistence;
