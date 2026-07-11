import onetype from '@onetype/framework';
import collections from './addon.js';
import './functions/lines.js';

const entries = onetype.Addon('collections.entries', (addon) =>
{
	addon.Table('entries');

	addon.Schema('id bigserial');

	for(const line of collections.Fn('lines'))
	{
		addon.Schema(line);
	}

	addon.Schema('primary key (collection, id)');
	addon.Schema('partition by list (collection)');
	addon.Schema('index using gin (data)');
});

export default entries;
