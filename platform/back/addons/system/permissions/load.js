import permissions from '#shared/system/permissions/addon.js';

permissions.Table('permissions');

/* Expose */
import '#permissions/expose.js';

/* Commands */
import '#permissions/items/commands/list.js';
import '#permissions/items/commands/get.js';

export default permissions;
