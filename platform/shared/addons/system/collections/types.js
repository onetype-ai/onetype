import onetype from '@onetype/framework';

/* The field-type registry. Each type maps to a framework field define (column kind)
   and carries UI metadata. The back uses `define` to materialize columns; the front
   uses name/icon/group to render the field palette. One mechanism, both sides. */

const types = onetype.Addon('collections.types', (addon) =>
{
	addon.Field('id', { type: 'string', required: true, description: 'Type key, e.g. text, number, reference.' });
	addon.Field('name', { type: 'string', required: true, description: 'Human name shown in the field palette.' });
	addon.Field('icon', { type: 'string', description: 'Material Symbols icon.' });
	addon.Field('group', { type: 'string', value: 'basic', description: 'Palette group: basic, value, media, relational, structure, advanced.' });
	addon.Field('define', { type: 'array', value: ['string'], description: 'Framework field define this type compiles to (column kind), e.g. [string], [number,0], [object,{}].', each: { type: 'any' } });
});

/* register the supported types — the define drives the real column type via auto-sync */
const list = [
	{ id: 'text', name: 'Text', icon: 'title', group: 'basic', define: ['string'] },
	{ id: 'richtext', name: 'Rich Text', icon: 'article', group: 'basic', define: ['object', {}] },
	{ id: 'number', name: 'Number', icon: 'tag', group: 'value', define: ['number', 0] },
	{ id: 'toggle', name: 'Toggle', icon: 'toggle_on', group: 'value', define: ['boolean', false] },
	{ id: 'select', name: 'Select', icon: 'list', group: 'value', define: ['string'] },
	{ id: 'multiselect', name: 'Multi Select', icon: 'checklist', group: 'value', define: ['array', []] },
	{ id: 'date', name: 'Date', icon: 'calendar_today', group: 'value', define: ['string'] },
	{ id: 'email', name: 'Email', icon: 'mail', group: 'basic', define: ['string'] },
	{ id: 'phone', name: 'Phone', icon: 'call', group: 'basic', define: ['string'] },
	{ id: 'url', name: 'URL', icon: 'link', group: 'basic', define: ['string'] },
	{ id: 'color', name: 'Color', icon: 'palette', group: 'value', define: ['string'] },
	{ id: 'location', name: 'Location', icon: 'location_on', group: 'value', define: ['object', {}] },
	{ id: 'image', name: 'Image', icon: 'image', group: 'media', define: ['object', {}] },
	{ id: 'gallery', name: 'Gallery', icon: 'collections', group: 'media', define: ['array', []] },
	{ id: 'file', name: 'File', icon: 'attach_file', group: 'media', define: ['object', {}] },
	{ id: 'video', name: 'Video', icon: 'videocam', group: 'media', define: ['object', {}] },
	{ id: 'reference', name: 'Reference', icon: 'link', group: 'relational', define: ['string'] },
	{ id: 'multireference', name: 'Multi Reference', icon: 'account_tree', group: 'relational', define: ['array', []] },
	{ id: 'user', name: 'User', icon: 'person', group: 'relational', define: ['string'] },
	{ id: 'repeater', name: 'Repeater', icon: 'repeat', group: 'structure', define: ['array', []] },
	{ id: 'group', name: 'Group', icon: 'folder', group: 'structure', define: ['object', {}] },
	{ id: 'keyvalue', name: 'Key Value', icon: 'data_object', group: 'structure', define: ['object', {}] },
	{ id: 'json', name: 'JSON', icon: 'code', group: 'advanced', define: ['object', {}] },
	{ id: 'price', name: 'Price', icon: 'payments', group: 'value', define: ['number', 0] },
	{ id: 'sku', name: 'SKU', icon: 'inventory_2', group: 'value', define: ['string'] },
	{ id: 'formula', name: 'Formula', icon: 'functions', group: 'advanced', define: ['string'] }
];

list.forEach((type) => types.Item(type));

export default types;
