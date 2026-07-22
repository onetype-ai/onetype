onetype.AddonReady('commands', (commands) =>
{
    commands.Fn('do.expose', 'commands:run', '/api/commands/run');
});
