import collections from '../addon.js';
import types from '../types.js';

const POOLS = {
	string: ['t1', 't2', 't3', 't4', 't5', 't6', 't7', 't8', 't9', 't10'],
	number: ['n1', 'n2', 'n3', 'n4', 'n5'],
	date: ['d1', 'd2', 'd3', 'd4'],
	reference: ['r1', 'r2', 'r3', 'r4', 'r5'],
	boolean: ['b1', 'b2', 'b3']
};

collections.Fn('slots', function(fields)
{
	const pools = {};
	const slots = {};

	for(const [type, list] of Object.entries(POOLS))
	{
		pools[type] = [...list];
	}

	for(const field of fields)
	{
		const type = types.ItemGet(field.type);

		if(!type || !type.Get('slot'))
		{
			continue;
		}

		const pool = pools[type.Get('type')];

		if(pool && pool.length)
		{
			slots[field.name] = pool.shift();
		}
	}

	return slots;
});
