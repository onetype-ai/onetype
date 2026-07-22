import platform from '#platform/addon.js';
import { writeFileSync } from 'fs';
import { resolve } from 'path';

platform.config.Fn('set.write', function()
{
    const data = {};

    for(const item of Object.values(this.Items()))
    {
        data[item.Get('id')] = item.Get('value');
    }

    writeFileSync(resolve(process.cwd(), 'onetype-platform.config.json'), JSON.stringify(data, null, '\t') + '\n');
});
