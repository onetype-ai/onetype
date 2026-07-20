$ot.system.persistence.get = function(key, fallback = null)
{
	const value = this.data[key];

	return value === null || value === undefined ? fallback : value;
};
