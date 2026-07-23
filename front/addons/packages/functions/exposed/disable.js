platform.packages.FnExpose('disable', async function(slug)
{
    const response = await $ot.command('packages:disable', { slug }, true);

    if(response.code === 200)
    {
        onetype.emitters.fire('platform.packages.disable', { slug: response.data.slug });
    }

    return response;
});
