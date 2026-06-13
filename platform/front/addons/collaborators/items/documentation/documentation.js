onetype.AddonReady('documentation', (documentation) =>
{
	documentation.Item({
		id: 'collaborators',
		order: 3,
		group: 'Global',
		icon: 'group',
		label: 'Collaborators',
		addon: 'collaborators',
		title: 'Collaborators',
		description: 'Presence inside the editor. Who joined, their avatar in the navbar and a live named cursor for everyone except the local session.',
		overview: `Collaborators is the presence layer of the editor. Every person or AI agent working inside the editor joins as a collaborator, shows up as an avatar in the navbar and gets a live cursor with their name on it. The local session never sees its own cursor, only everyone else.

A collaborator is a small item: an id, a display name, a color token and a type. The type separates people from agents, a user gets initials on the avatar, an agent gets a robot icon. Colors come from the action palette and paint both the avatar and the cursor, so a collaborator is recognizable at a glance. When no color is passed on join, the next free one is picked automatically.

Everything goes through commands. collaborators:join adds someone to the editor, collaborators:leave removes them, collaborators:move places their cursor at a viewport position. The move command is silent, it fires constantly while someone works, so the terminal does not log it. The local session broadcasts its own mouse through the same collaborators:move command every other collaborator uses, which means the whole pipeline is already shaped for a socket transport: a future sync layer only relays the same commands between sessions, nothing about the addon changes.

Cursor rendering never re-renders the UI. The element listens to collaborators.move and writes the transform straight to the DOM node of that cursor, while the store keeps the last position so a re-render lands every cursor back on its spot. Join and leave are the only events that rebuild the avatar stack.

For now the local user and one AI assistant join automatically on boot, as a stand in until real sessions exist. Try it from the terminal: collaborators:join id=mika name=Mika adds a teammate, collaborators:move id=mika x=600 y=400 glides her cursor across the screen, collaborators:leave id=mika waves her out.`
	});
});
