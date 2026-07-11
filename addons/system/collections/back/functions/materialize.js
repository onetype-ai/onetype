import onetype from '@onetype/framework';
import collections from '../addon.js';

const RESERVED = ['id', 'collection', 'data', 'created_at', 'updated_at', 'deleted_at'];

collections.Fn('materialize', function(definition)
{
	const runtime = onetype.Addon('collections.' + definition.slug);
	const slots = collections.Fn('slots', definition.fields);
	const keep = new Set([...RESERVED, ...definition.fields.map((field) => field.name)]);

	runtime.Table('entries_' + definition.id);

	for(const name of Object.keys(runtime.Fields().data))
	{
		if(!keep.has(name))
		{
			runtime.FieldRemove(name, false);
		}
	}

	runtime.FieldAdd('id', ['number']);
	runtime.FieldAdd('collection', ['number', Number(definition.id)]);

	for(const field of definition.fields)
	{
		runtime.FieldAdd(field.name, collections.Fn('define', field, slots[field.name]));
	}

	runtime.FieldAdd('data', { type: 'object', value: {}, virtual: true, metadata: { spread: true } });
	runtime.FieldAdd('created_at', { type: 'string', metadata: { cast: 'date' } });
	runtime.FieldAdd('updated_at', { type: 'string', metadata: { cast: 'date' } });
	runtime.FieldAdd('deleted_at', { type: 'string', metadata: { cast: 'date' } });

	const lines = runtime.Schema();

	lines.length = 0;
	lines.push('id bigserial primary key');
	lines.push(...collections.Fn('lines'));

	for(const field of definition.fields)
	{
		const slot = slots[field.name];

		if(!slot)
		{
			continue;
		}

		if(field.unique)
		{
			lines.push(`unique (${slot})`);
		}
		else if(field.index)
		{
			lines.push(`index (${slot})`);
		}
	}

	if(definition.versions !== false)
	{
		runtime.Versions(['collection'], { invert: true });
	}

	const translate = definition.fields.filter((field) => field.translate).map((field) => field.name);

	if(translate.length)
	{
		runtime.Translations(translate);
	}

	const search = [...new Set([...(definition.search || []), ...definition.fields.filter((field) => field.search).map((field) => field.name)])];

	if(search.length)
	{
		runtime.Search(search);
	}

	return runtime;
});
