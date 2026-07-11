import packages from '#packages/addon.js';
import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';

packages.Fn('limits', function(slug)
{
	const item = Object.values(this.Items()).find((candidate) => candidate.Get('slug') === slug);
	const path = resolve(process.cwd(), 'config.json');
	const overrides = existsSync(path) ? (JSON.parse(readFileSync(path, 'utf8')).limits || {}) : {};

	return { ...(item ? item.Get('limits') : {}), ...(overrides[slug] || {}) };
});
