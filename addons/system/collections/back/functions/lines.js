import collections from '../addon.js';

collections.Fn('lines', function()
{
	return [
		'collection bigint not null',
		't1 text', 't2 text', 't3 text', 't4 text', 't5 text', 't6 text', 't7 text', 't8 text', 't9 text', 't10 text',
		'n1 numeric', 'n2 numeric', 'n3 numeric', 'n4 numeric', 'n5 numeric',
		'd1 timestamptz', 'd2 timestamptz', 'd3 timestamptz', 'd4 timestamptz',
		'r1 bigint', 'r2 bigint', 'r3 bigint', 'r4 bigint', 'r5 bigint',
		'b1 boolean', 'b2 boolean', 'b3 boolean',
		'fts tsvector',
		'data jsonb',
		'created_at timestamptz',
		'updated_at timestamptz',
		'deleted_at timestamptz'
	];
});
