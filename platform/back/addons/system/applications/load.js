import applications from '#shared/system/applications/addon.js';

applications.Table('applications');

/* Expose */
import '#applications/expose.js';

/* Commands */
import '#applications/items/commands/list.js';
import '#applications/items/commands/get.js';

export default applications;
