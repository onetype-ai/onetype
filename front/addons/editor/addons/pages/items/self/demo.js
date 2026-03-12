onetype.AddonReady('editor.pages', () =>
{
    editor.pages.Item({ id: 'p1', title: 'Home', slug: '/', order: 0 });
    editor.pages.Item({ id: 'p2', title: 'About', slug: '/about', order: 1 });
    editor.pages.Item({ id: 'p3', title: 'Services', slug: '/services', order: 2 });
    editor.pages.Item({ id: 'p4', title: 'Contact', slug: '/contact', order: 3 });
});
