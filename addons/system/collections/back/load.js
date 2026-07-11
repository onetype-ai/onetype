import collections from './addon.js';

/* Entries storage (partitioned parent) */
import './entries.js';

/* Field types registry */
import './types.js';
import './items/self/text.js';
import './items/self/numbers.js';
import './items/self/content.js';
import './items/self/structure.js';
import './items/self/relations.js';

/* Schemas */
import './core/schemas/field.js';
import './core/schemas/collection.js';

/* Listeners */
import './core/listeners/addons.js';
import './core/listeners/boot.js';

/* Functions */
import './functions/declare.js';
import './functions/slots.js';
import './functions/define.js';
import './functions/materialize.js';
import './functions/partition.js';
import './functions/apply.js';
import './functions/sync.js';
import './functions/get.js';
import './functions/export.js';
import './functions/import.js';

/* Commands */
import './items/commands/types.js';
import './items/commands/list.js';
import './items/commands/get.js';
import './items/commands/create.js';
import './items/commands/update.js';
import './items/commands/delete.js';
import './items/commands/export.js';
import './items/commands/import.js';

export default collections;
