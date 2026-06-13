onetype.AddonReady('documentation', (documentation) =>
{
	documentation.Item({
		id: 'presets',
		order: 8,
		group: 'Global',
		icon: 'dashboard_customize',
		label: 'Presets',
		addon: 'presets',
		title: 'Presets',
		description: 'Live templates for anything. A preset takes input, runs its callback and returns the materialized result.',
		overview: `A preset is a živ šablon: ne mrtav JSON, nego callback koji od ulaza pravi rezultat. Kolekcija sa poljima, tag definicija, bridge endpoint, workflow, šta god neki addon sutra poželi.

Svaki preset je item ovog addona: grupa kaže kom domenu pripada, config je define šema ulaza, callback prima validiran ulaz i vraća rezultat. App i mode polja po standardu sužavaju gde je preset vidljiv, prazno znači svuda.

Pozivanje ide kroz presets:run, iz koda, terminala ili AI sloja, a presets:list otkriva šta postoji po grupi. Validacija ulaza je stroga, nepoznata polja i pogrešni tipovi padaju pre callbacka.

Treća strana registruje preset istim API-jem kao mi, jedan item sa callbackom. Vlasnik domena, recimo collections, samo pita presets za svoju grupu i nudi ih u svom UI-ju.`
	});
});
