/* TEMP — the local session and the assistant join here
   until real sessions and the socket transport exist. */

onetype.EmitOn('@document.ready', () =>
{
	const person = workspace.users.ItemGet('dejan');

	$ot.command('collaborators:join', { id: 'dejan', name: person ? person.Get('name') : 'Dejan', self: true });
	$ot.command('collaborators:join', { id: 'assistant', name: 'Assistant', type: 'agent', color: 'brand' });
});
