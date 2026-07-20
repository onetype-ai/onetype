/* Hydrates the cache once on boot. Signed in reads the user's values from the
   back, signed out falls back to the browser so the UI remembers either way. */
$ot.system.persistence.load = async function()
{
	if(this.loaded)
	{
		return this.data;
	}

	const response = await $ot.command('persistence:many', {}, true).catch(() => null);

	if(response && response.code === 200)
	{
		this.data = response.data.values;
	}
	else
	{
		this.local = true;

		try
		{
			this.data = JSON.parse(localStorage.getItem('onetype.persistence')) || {};
		}
		catch(error)
		{
			this.data = {};
		}
	}

	this.loaded = true;

	return this.data;
};
