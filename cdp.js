// Fast, modular CDP driver. Zero deps, raw WebSocket to a Chrome started with
// --remote-debugging-port=9222. Use as a library (import { connect }) or CLI.
//
// CLI:
//   node cdp.js eval "document.title"          run JS, print result (+ console + errors)
//   node cdp.js eval --file probe.js            run a file
//   echo "1+1" | node cdp.js eval -             run stdin
//   node cdp.js click <x> <y>                   real trusted click
//   node cdp.js click "<selector>"              click element center
//   node cdp.js type "text" [--enter]           type with real key events
//   node cdp.js key Enter [Escape ...]          press named keys
//   node cdp.js cmd "modes:switch" '{"id":"x"}' run a $ot.command, print result
//   node cdp.js resize <w> <h>                  set viewport
//   node cdp.js shot <out.png> [x y w h]        screenshot (full or clip)
//   node cdp.js wait "<selector>" [ms]          wait until selector exists
//   node cdp.js layout                          dump slot sizes of the layout
//   node cdp.js dump "<selector>"               outerHTML of first match
//   node cdp.js reload                          reload the page
//   node cdp.js logs [ms]                       stream console for ms (default 3000)
//
// Env: CDP_PORT (9222), CDP_MATCH (localhost:3000)

import { readFileSync, writeFileSync } from 'node:fs';

const PORT = process.env.CDP_PORT || '9222';
const MATCH = process.env.CDP_MATCH || 'localhost:3000';

const KEYS = {
	Enter: { key: 'Enter', code: 'Enter', windowsVirtualKeyCode: 13 },
	Tab: { key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 },
	Escape: { key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 },
	Backspace: { key: 'Backspace', code: 'Backspace', windowsVirtualKeyCode: 8 },
	ArrowUp: { key: 'ArrowUp', code: 'ArrowUp', windowsVirtualKeyCode: 38 },
	ArrowDown: { key: 'ArrowDown', code: 'ArrowDown', windowsVirtualKeyCode: 40 },
	ArrowLeft: { key: 'ArrowLeft', code: 'ArrowLeft', windowsVirtualKeyCode: 37 },
	ArrowRight: { key: 'ArrowRight', code: 'ArrowRight', windowsVirtualKeyCode: 39 }
};

export async function connect({ port = PORT, match = MATCH, onConsole, onError } = {})
{
	const targets = await fetch(`http://localhost:${port}/json`).then((response) => response.json());
	const page = targets.find((target) => target.type === 'page' && (target.url || '').includes(match)) || targets.find((target) => target.type === 'page');

	if(!page)
	{
		throw new Error('No page target. Tabs:\n' + targets.map((target) => `  ${target.type}  ${target.url}`).join('\n'));
	}

	const socket = new WebSocket(page.webSocketDebuggerUrl);
	const pending = new Map();
	let id = 0;

	socket.addEventListener('message', (event) =>
	{
		const data = JSON.parse(event.data);

		if(data.id && pending.has(data.id))
		{
			pending.get(data.id)(data);
			pending.delete(data.id);
		}
		else if(data.method === 'Runtime.consoleAPICalled' && onConsole)
		{
			onConsole(data.params.type, data.params.args.map((arg) => arg.value !== undefined ? arg.value : (arg.description || arg.type)).join(' '));
		}
		else if(data.method === 'Runtime.exceptionThrown' && onError)
		{
			const detail = data.params.exceptionDetails;
			onError(detail.exception?.description || detail.text);
		}
	});

	await new Promise((resolve) => socket.addEventListener('open', resolve));

	const session = {
		page,
		socket,

		send(method, params = {})
		{
			return new Promise((resolve) =>
			{
				const message = ++id;
				pending.set(message, resolve);
				socket.send(JSON.stringify({ id: message, method, params }));
			});
		},

		// Evaluate JS in the page. Accepts an expression or a statement body.
		async eval(code, { returnByValue = true } = {})
		{
			const body = /\breturn\b|;|\bawait\b/.test(code) ? code : `return (${code});`;

			const result = await this.send('Runtime.evaluate', {
				expression: `(async () => { ${body} })()`,
				awaitPromise: true,
				returnByValue
			});

			if(result.result?.exceptionDetails)
			{
				throw new Error(result.result.exceptionDetails.exception?.description || result.result.exceptionDetails.text);
			}

			return result.result?.result?.value;
		},

		// Run a $ot.command and return its resolved value.
		async command(name, data = {})
		{
			return this.eval(`return await $ot.command(${JSON.stringify(name)}, ${JSON.stringify(data)});`);
		},

		async rect(selector)
		{
			return this.eval(`
				const node = document.querySelector(${JSON.stringify(selector)});
				if(!node) return null;
				const box = node.getBoundingClientRect();
				return { x: box.x, y: box.y, width: box.width, height: box.height, cx: box.x + box.width / 2, cy: box.y + box.height / 2 };
			`);
		},

		async click(x, y)
		{
			await this.send('Input.dispatchMouseEvent', { type: 'mouseMoved', x, y });
			await this.send('Input.dispatchMouseEvent', { type: 'mousePressed', x, y, button: 'left', clickCount: 1 });
			await this.send('Input.dispatchMouseEvent', { type: 'mouseReleased', x, y, button: 'left', clickCount: 1 });
		},

		async clickSelector(selector)
		{
			const box = await this.rect(selector);

			if(!box)
			{
				throw new Error('No element for selector ' + selector);
			}

			await this.click(box.cx, box.cy);
		},

		async type(text, { enter = false, delay = 15 } = {})
		{
			for(const char of text)
			{
				await this.send('Input.dispatchKeyEvent', { type: 'keyDown', text: char, key: char });
				await this.send('Input.dispatchKeyEvent', { type: 'keyUp', key: char });
				await new Promise((resolve) => setTimeout(resolve, delay));
			}

			if(enter)
			{
				await this.key('Enter');
			}
		},

		async key(name)
		{
			const key = KEYS[name] || { key: name, code: name };
			await this.send('Input.dispatchKeyEvent', { type: 'keyDown', ...key });
			await this.send('Input.dispatchKeyEvent', { type: 'keyUp', ...key });
		},

		async resize(width, height)
		{
			await this.send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: false });
		},

		async screenshot(out, clip = null)
		{
			const limit = 1500;
			const metrics = await this.send('Page.getLayoutMetrics', {});
			const viewport = metrics.result.cssLayoutViewport;
			const area = clip || { x: 0, y: 0, width: viewport.clientWidth, height: viewport.clientHeight };

			area.scale = Math.min(1, limit / Math.max(area.width, area.height));

			const result = await this.send('Page.captureScreenshot', { format: 'png', clip: area });

			writeFileSync(out, Buffer.from(result.result.data, 'base64'));

			return out;
		},

		async wait(selector, timeout = 5000)
		{
			const started = Date.now();

			while(Date.now() - started < timeout)
			{
				if(await this.eval(`return !!document.querySelector(${JSON.stringify(selector)});`))
				{
					return true;
				}

				await new Promise((resolve) => setTimeout(resolve, 50));
			}

			throw new Error('Timeout waiting for ' + selector);
		},

		async reload()
		{
			await this.send('Page.enable', {});
			await this.send('Page.reload', {});
		},

		async layout()
		{
			return this.eval(`
				const out = {};
				for(const slot of document.querySelectorAll('.slot'))
				{
					const name = (slot.getAttribute('class') || '').replace('slot', '').trim();
					const box = slot.getBoundingClientRect();
					out[name] = { w: Math.round(box.width), h: Math.round(box.height), items: slot.children.length };
				}
				return out;
			`);
		},

		async dump(selector)
		{
			return this.eval(`
				const node = document.querySelector(${JSON.stringify(selector)});
				return node ? node.outerHTML : null;
			`);
		},

		close()
		{
			socket.close();
		}
	};

	await session.send('Runtime.enable', {});
	await session.send('Page.enable', {});

	return session;
}

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------

async function main()
{
	const all = process.argv.slice(2);
	const quiet = all.includes('--quiet');
	const [command, ...args] = all.filter((arg) => arg !== '--quiet');

	if(!command)
	{
		console.error('Usage: node cdp.js <eval|click|type|key|cmd|resize|shot|wait|layout|dump|reload|logs> ...');
		process.exit(2);
	}

	const session = await connect({
		onConsole: quiet ? null : (type, text) => console.log(`[console.${type}]`, text),
		onError: quiet ? null : (text) => console.log('[exception]', text)
	});

	const done = async (value) =>
	{
		if(value !== undefined)
		{
			console.log(typeof value === 'string' ? value : JSON.stringify(value, null, 2));
		}

		await new Promise((resolve) => setTimeout(resolve, 150));
		session.close();
		process.exit(0);
	};

	try
	{
		if(command === 'eval')
		{
			const code = args[0] === '--file' ? readFileSync(args[1], 'utf8') : args[0] === '-' ? readFileSync(0, 'utf8') : args[0];
			return done(await session.eval(code));
		}

		if(command === 'click')
		{
			if(isNaN(Number(args[0])))
			{
				await session.clickSelector(args[0]);
			}
			else
			{
				await session.click(Number(args[0]), Number(args[1]));
			}

			return done('clicked');
		}

		if(command === 'type')
		{
			await session.type(args[0] || '', { enter: args.includes('--enter') });
			return done('typed');
		}

		if(command === 'key')
		{
			for(const name of args)
			{
				await session.key(name);
			}

			return done('pressed ' + args.join(' '));
		}

		if(command === 'cmd')
		{
			return done(await session.command(args[0], args[1] ? JSON.parse(args[1]) : {}));
		}

		if(command === 'resize')
		{
			await session.resize(Number(args[0]) || 1440, Number(args[1]) || 900);
			return done('resized');
		}

		if(command === 'shot')
		{
			const clip = args.length >= 5 ? { x: Number(args[1]), y: Number(args[2]), width: Number(args[3]), height: Number(args[4]) } : null;
			return done('saved ' + await session.screenshot(args[0] || '/tmp/shot.png', clip));
		}

		if(command === 'wait')
		{
			await session.wait(args[0], Number(args[1]) || 5000);
			return done('found ' + args[0]);
		}

		if(command === 'layout')
		{
			return done(await session.layout());
		}

		if(command === 'dump')
		{
			return done(await session.dump(args[0]));
		}

		if(command === 'reload')
		{
			await session.reload();
			return done('reloaded');
		}

		if(command === 'logs')
		{
			await new Promise((resolve) => setTimeout(resolve, Number(args[0]) || 3000));
			return done();
		}

		console.error('Unknown command: ' + command);
		session.close();
		process.exit(2);
	}
	catch(error)
	{
		console.log('[error]', error.message);
		session.close();
		process.exit(1);
	}
}

if(import.meta.url === `file://${process.argv[1]}`)
{
	main();
}
