elements.ItemAdd({
	id: 'website-landing',
	icon: 'language',
	name: 'Website Landing',
	description: 'The onetype.ai landing page: hero, product bento, package catalog, AI terminal, pricing and the closing statement.',
	category: 'Website',
	collection: 'Home',
	author: 'OneType',
	metadata: { addon: 'website' },
	config: {},
	render: function()
	{
		/* ===== DATA ===== */

		this.chips = [
			{ id: 'cms', icon: 'database', name: 'CMS' },
			{ id: 'builder', icon: 'design_services', name: 'Builder' },
			{ id: 'workflows', icon: 'account_tree', name: 'Workflows' },
			{ id: 'developer', icon: 'code', name: 'Developer' },
			{ id: 'mail', icon: 'mail', name: 'Mail' },
			{ id: 'analytics', icon: 'monitoring', name: 'Analytics' },
			{ id: 'bridge', icon: 'cable', name: 'Bridge' },
			{ id: 'terminal', icon: 'terminal', name: 'Terminal' },
			{ id: 'assistants', icon: 'smart_toy', name: 'Assistants' },
			{ id: 'commerce', icon: 'storefront', name: 'Commerce' },
			{ id: 'docs', icon: 'menu_book', name: 'Docs' },
			{ id: 'forms', icon: 'list_alt', name: 'Forms' }
		];

		this.lines = [
			{ id: 1, kind: 'input', text: 'onetype create workspace' },
			{ id: 2, kind: 'output', text: 'Workspace ready on one universal database' },
			{ id: 3, kind: 'input', text: 'onetype install cms builder workflows' },
			{ id: 4, kind: 'output', text: 'Three packages installed with one command' },
			{ id: 5, kind: 'ask', text: 'ask "publish the launch post everywhere"' },
			{ id: 6, kind: 'magic', text: 'AI ran 14 commands across 3 packages' }
		];

		this.plans = [
			{ id: 'free', name: 'Free', price: '0', period: 'forever', note: 'Self host the whole platform.', points: ['Unlimited packages', 'One workspace', 'Community support'], featured: false, action: 'Start free' },
			{ id: 'pro', name: 'Pro', price: '19', period: 'per member / month', note: 'Managed cloud with everything on.', points: ['Managed hosting', 'AI automation included', 'Marketplace revenue share', 'Priority support'], featured: true, action: 'Start with Pro' },
			{ id: 'scale', name: 'Scale', price: '49', period: 'per member / month', note: 'For teams running products on OneType.', points: ['Dedicated resources', 'SLA and audit logs', 'Custom packages support'], featured: false, action: 'Talk to us' }
		];

		/* ===== HANDLERS ===== */

		this.jump = (target) =>
		{
			const section = document.getElementById(target);

			section && section.scrollIntoView({ behavior: 'smooth' });
		};

		/* ===== RENDER ===== */

		return /* html */ `
			<div class="box">

				<section id="site-hero" class="hero">
					<div class="badge"><span class="pulse"></span>Open source, in development</div>
					<h1>One workspace.<br /><em>Everything connected.</em><br />Everything yours.</h1>
					<p>OneType is an open source workspace platform where every app is a package, every action is a command and one universal database powers all of it. Built for people, driven by AI.</p>
					<div class="actions">
						<button type="button" class="cta solid" ot-click="() => jump('site-pricing')">Get started<i>arrow_forward</i></button>
						<a class="cta ghost" href="https://github.com/onetype-ai/onetype" target="_blank"><i>code</i>View on GitHub</a>
					</div>
					<div class="float one"><i>database</i>CMS</div>
					<div class="float two"><i>design_services</i>Builder</div>
					<div class="float three"><i>smart_toy</i>AI</div>
				</section>

				<section id="site-product" class="block">
					<div class="eyebrow">Product</div>
					<h2>The whole platform is a skeleton.<br />Packages are the body.</h2>
					<div class="bento">
						<div class="tile wide">
							<div class="mock chrome">
								<span class="dots"><span></span><span></span><span></span></span>
								<span class="bar long"></span>
								<span class="bar"></span>
								<span class="bar short"></span>
							</div>
							<h3>A builder, not a template</h3>
							<p>A Webflow class visual editor ships as a package. Sites, dashboards and tools are assembled from live elements, this page included.</p>
						</div>
						<div class="tile">
							<div class="mock mesh"></div>
							<h3>One universal database</h3>
							<p>Every package reads and writes the same collections. No silos, no sync.</p>
						</div>
						<div class="tile">
							<div class="mock board"><span></span><span></span><span></span></div>
							<h3>Ten listing views</h3>
							<p>Table, grid, board, calendar, gallery, timeline and more, on any collection.</p>
						</div>
						<div class="tile">
							<div class="mock terminal">
								<span>$ ui:apps:open</span>
								<span>$ cms:entries:create</span>
								<span class="glow">✓ done in 12ms</span>
							</div>
							<h3>Everything is a command</h3>
							<p>The UI and the AI call the exact same API. No privileged code.</p>
						</div>
						<div class="tile wide">
							<div class="mock chips">
								<span><i>database</i>CMS</span>
								<span><i>design_services</i>Builder</span>
								<span><i>account_tree</i>Workflows</span>
								<span><i>mail</i>Mail</span>
								<span><i>monitoring</i>Analytics</span>
							</div>
							<h3>Everything is a package</h3>
							<p>Modes, panels, toolbars, zones. Anything we build in, a third party can build the same way, with the same API.</p>
						</div>
					</div>
				</section>

				<section id="site-packages" class="block">
					<div class="eyebrow">Packages</div>
					<h2>Install capabilities,<br />not applications.</h2>
					<p class="lead">The marketplace grows the platform. Each package brings its apps, modes, elements and commands into your workspace.</p>
					<div class="catalog">
						<div ot-for="chip in chips" :ot-key="chip.id" class="entry"><i>{{ chip.icon }}</i><span>{{ chip.name }}</span></div>
					</div>
				</section>

				<section id="site-ai" class="block">
					<div class="eyebrow">AI</div>
					<h2>Automation that speaks<br />the platform natively.</h2>
					<p class="lead">Because every action is a described command, AI does not need integrations. It reads the catalog and drives the whole workspace.</p>
					<div class="shell">
						<div class="head"><span class="dots"><span></span><span></span><span></span></span><span class="title">onetype</span></div>
						<div class="body">
							<div ot-for="line in lines" :ot-key="line.id" :class="'line ' + line.kind">
								<span ot-if="line.kind === 'input'" class="mark">$</span>
								<span ot-if="line.kind === 'output'" class="mark ok">✓</span>
								<span ot-if="line.kind === 'ask'" class="mark ask">❯</span>
								<span ot-if="line.kind === 'magic'" class="mark magic">✦</span>
								<span class="text">{{ line.text }}</span>
							</div>
						</div>
					</div>
				</section>

				<section id="site-pricing" class="block">
					<div class="eyebrow">Pricing</div>
					<h2>Free where it matters.<br />Fair where it scales.</h2>
					<div class="plans">
						<div ot-for="plan in plans" :ot-key="plan.id" :class="plan.featured ? 'plan featured' : 'plan'">
							<span class="name">{{ plan.name }}</span>
							<span class="price"><em>$</em>{{ plan.price }}</span>
							<span class="period">{{ plan.period }}</span>
							<span class="note">{{ plan.note }}</span>
							<span class="points"><span ot-for="point in plan.points" :ot-key="point" class="point"><i>check</i>{{ point }}</span></span>
							<button type="button" class="cta solid">{{ plan.action }}</button>
						</div>
					</div>
				</section>

				<section id="site-footer" class="ending">
					<h2>The platform <em>is</em> the website.</h2>
					<p>This page is a OneType package, rendered by the same engine that runs your workspace. What you are reading is the product working.</p>
					<div class="actions">
						<a class="cta solid" href="https://github.com/onetype-ai/onetype" target="_blank"><i>star</i>Star on GitHub</a>
					</div>
					<div class="base">
						<span>© 2026 OneType</span>
						<span class="dot"></span>
						<span>Open source</span>
						<span class="dot"></span>
						<span>onetype.ai</span>
					</div>
				</section>

			</div>
		`;
	}
});
