/* TEMP DEMO — a sample catalog until the real data layer lands. */

collections.Item({ id: 'posts', order: 1, group: 'Content', icon: 'article', name: 'Blog Posts', count: 124 });
collections.Item({ id: 'authors', order: 2, group: 'Content', icon: 'person', name: 'Authors', parent: 'posts', count: 8 });
collections.Item({ id: 'categories', order: 3, group: 'Content', icon: 'sell', name: 'Categories', parent: 'posts', count: 12 });
collections.Item({ id: 'projects', order: 4, group: 'Content', icon: 'work', name: 'Projects', count: 37 });

collections.Item({ id: 'products', order: 1, group: 'Commerce', icon: 'inventory_2', name: 'Products', count: 89 });
collections.Item({ id: 'variants', order: 2, group: 'Commerce', icon: 'style', name: 'Variants', parent: 'products', count: 312 });
collections.Item({ id: 'reviews', order: 3, group: 'Commerce', icon: 'reviews', name: 'Reviews', parent: 'products', count: 1438 });
collections.Item({ id: 'replies', order: 1, group: 'Commerce', icon: 'reply', name: 'Replies', parent: 'reviews', count: 230 });
collections.Item({ id: 'orders', order: 4, group: 'Commerce', icon: 'receipt_long', name: 'Orders', count: 1204 });

collections.Item({ id: 'members', order: 1, group: 'Members', icon: 'group', name: 'Members', count: 3411 });
collections.Item({ id: 'plans', order: 2, group: 'Members', icon: 'card_membership', name: 'Plans', count: 3 });

collections.Item({ id: 'contact', order: 1, group: 'Forms', icon: 'mail', name: 'Contact', count: 456 });

collections.Item({ id: 'site', order: 1, group: 'Settings', icon: 'tune', name: 'Site Settings', kind: 'settings' });
collections.Item({ id: 'seo', order: 2, group: 'Settings', icon: 'travel_explore', name: 'SEO Defaults', kind: 'settings' });
