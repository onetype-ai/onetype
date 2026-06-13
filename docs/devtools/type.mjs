// Types text into the focused element using real CDP key events (trusted, like a keyboard).
// Usage: node docs/devtools/type.mjs "modes:switch {\"id\": \"design\"}" [--enter]

const port = process.env.CDP_PORT || '9222';
const match = process.env.CDP_MATCH || 'localhost:3000';

const text = process.argv[2] || '';
const enter = process.argv.includes('--enter');

const targets = await fetch(`http://localhost:${port}/json`).then(response => response.json());
const page = targets.find(target => target.type === 'page' && (target.url || '').includes(match)) || targets.find(target => target.type === 'page');

const socket = new WebSocket(page.webSocketDebuggerUrl);
const pending = new Map();
let id = 0;

function send(method, params)
{
	return new Promise((resolve) =>
	{
		const message = ++id;
		pending.set(message, resolve);
		socket.send(JSON.stringify({id: message, method, params}));
	});
}

socket.addEventListener('message', (event) =>
{
	const data = JSON.parse(event.data);

	if(data.id && pending.has(data.id))
	{
		pending.get(data.id)(data);
		pending.delete(data.id);
	}
});

await new Promise((resolve) => socket.addEventListener('open', resolve));

for(const char of text)
{
	await send('Input.dispatchKeyEvent', { type: 'keyDown', text: char, key: char });
	await send('Input.dispatchKeyEvent', { type: 'keyUp', key: char });
	await new Promise((resolve) => setTimeout(resolve, 20));
}

if(enter)
{
	await send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Enter', code: 'Enter', windowsVirtualKeyCode: 13 });
	await send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Enter', code: 'Enter', windowsVirtualKeyCode: 13 });
}

console.log('typed');
socket.close();
process.exit(0);
