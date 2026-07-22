import platform from '#platform/addon.js';
import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';

platform.config.Fn('get.read', function()
{
    const file = resolve(process.cwd(), 'onetype-platform.config.json');

    return existsSync(file) ? JSON.parse(readFileSync(file, 'utf8')) : {};
});
