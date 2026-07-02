import projects from '#shared/system/projects/addon.js';

projects.Table('projects');

/* Listeners */
import '#projects/core/listeners/http.js';

/* Expose */
import '#projects/core/expose.js';

/* Commands */
import '#projects/items/commands/crud/list.js';
import '#projects/items/commands/crud/get.js';
import '#projects/items/commands/crud/create.js';
import '#projects/items/commands/crud/update.js';
import '#projects/items/commands/crud/delete.js';
import '#projects/items/commands/applications/install.js';
import '#projects/items/commands/applications/uninstall.js';

/* Pipelines */
import '#projects/core/pipelines/crud/create.js';
import '#projects/core/pipelines/crud/update.js';
import '#projects/core/pipelines/crud/delete.js';
import '#projects/core/pipelines/applications/install.js';
import '#projects/core/pipelines/applications/uninstall.js';

export default projects;
