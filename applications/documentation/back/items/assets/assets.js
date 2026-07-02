import assets from '@onetype/framework/assets';
import { resolve } from 'path';

const root = resolve(import.meta.dirname, '..', '..', '..');

assets.Item({ type: 'js', order: 9500, path: resolve(root, 'shared') });
assets.Item({ type: 'css', order: 9500, path: resolve(root, 'shared') });
assets.Item({ type: 'js', order: 10000, path: resolve(root, 'front') });
assets.Item({ type: 'css', order: 10000, path: resolve(root, 'front') });
