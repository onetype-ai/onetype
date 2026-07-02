assistants.Fn('download', function(sample)
{
	const name = sample.agent + '-' + sample.verdict + '-' + Date.now() + '.json';
	const blob = new Blob([JSON.stringify(sample, null, '\t')], { type: 'application/json' });
	const url = URL.createObjectURL(blob);
	const anchor = document.createElement('a');

	anchor.href = url;
	anchor.download = name;
	anchor.click();

	URL.revokeObjectURL(url);

	return name;
});
