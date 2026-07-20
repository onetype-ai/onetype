/* Writes land in the cache at once and flush to the back in one debounced
   batch, so a burst of UI changes costs one request. Null removes the key. */
$ot.system.persistence.set = function(key, value)
{
	if(value === null)
	{
		delete this.data[key];
	}
	else
	{
		this.data[key] = value;
	}

	if(this.local)
	{
		localStorage.setItem('onetype.persistence', JSON.stringify(this.data));

		return;
	}

	this.pending[key] = value;

	clearTimeout(this.timer);

	this.timer = setTimeout(() =>
	{
		const values = this.pending;

		this.pending = {};

		$ot.command('persistence:set', { values }, true).catch(() => null);
	}, 500);
};
