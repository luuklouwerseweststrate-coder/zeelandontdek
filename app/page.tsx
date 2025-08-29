export default function HomePage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">
              Fietsen en wandelen in Zeeland
            </h1>
            <p className="text-base opacity-80 max-w-xl">
              Vind routes op Walcheren, Bevelanden, Schouwen-Duiveland, Tholen en Zeeuws-Vlaanderen.
              Filter op type, afstand en eiland. Sla favorieten op en bekijk routes op de kaart.
            </p>
            <div className="mt-6 flex gap-3">
              <a href="/routes" className="px-4 py-2 rounded-lg bg-neutral-900 text-white hover:bg-neutral-800">Bekijk routes</a>
              <a href="#ontdek" className="px-4 py-2 rounded-lg border border-neutral-300 hover:bg-neutral-50">Plan je bezoek</a>
            </div>
          </div>
          <div className="aspect-[16/9] md:aspect-auto md:h-72 rounded-2xl overflow-hidden bg-[url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1400&auto=format&fit=crop')] bg-cover bg-center" />
        </div>
      </section>

      {/* Secties */}
      <section id="ontdek" className="border-t border-neutral-200 bg-white scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h2 className="text-2xl font-semibold mb-2">Ontdek Zeeland</h2>
          <p className="text-sm opacity-80 mb-6">Korte introductie over de eilanden en thema's.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {["Walcheren","Noord-Beveland","Zuid-Beveland","Schouwen-Duiveland","Tholen","Zeeuws-Vlaanderen"].map((name) => (
              <a key={name} href="#" className="rounded-2xl border border-neutral-200 p-4 hover:bg-neutral-50">
                <div className="font-medium">{name}</div>
                <div className="text-sm opacity-70">Lees meer</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="zien" className="border-t border-neutral-200 bg-white scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h2 className="text-2xl font-semibold mb-2">Zien & Doen</h2>
          <p className="text-sm opacity-80 mb-6">Categorie-overzicht voor activiteiten.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {["Stranden","Musea","Watersport","Verhuur","Met kinderen","Natuurgebieden"].map((name) => (
              <a key={name} href="#" className="rounded-2xl border border-neutral-200 p-4 hover:bg-neutral-50">
                <div className="font-medium">{name}</div>
                <div className="text-sm opacity-70">Bekijk</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="slapen" className="border-t border-neutral-200 bg-white scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h2 className="text-2xl font-semibold mb-2">Blijven slapen</h2>
          <p className="text-sm opacity-80 mb-6">Overzicht van verblijfstypen.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {["Hotels","B&B's","Campings","Vakantieparken","Camperplaatsen","Vakantiehuizen"].map((name) => (
              <a key={name} href="#" className="rounded-2xl border border-neutral-200 p-4 hover:bg-neutral-50">
                <div className="font-medium">{name}</div>
                <div className="text-sm opacity-70">Meer info</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="eten" className="border-t border-neutral-200 bg-white scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h2 className="text-2xl font-semibold mb-2">Eten & Drinken</h2>
          <p className="text-sm opacity-80 mb-6">Restaurants en lokale adressen.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {["Restaurants","Strandpaviljoens","Cafés","Brouwerijen & wijngaarden","Streekproducten"].map((name) => (
              <a key={name} href="#" className="rounded-2xl border border-neutral-200 p-4 hover:bg-neutral-50">
                <div className="font-medium">{name}</div>
                <div className="text-sm opacity-70">Bekijk</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="agenda" className="border-t border-neutral-200 bg-white scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h2 className="text-2xl font-semibold mb-2">Agenda</h2>
          <p className="text-sm opacity-80 mb-6">Voorbeeld van aankomende events. Later via CMS.</p>
          <ul className="divide-y divide-neutral-200 rounded-2xl border border-neutral-200 overflow-hidden">
            {[{date:"12 okt", title:"Kustwandeling Westkapelle"},{date:"26 okt", title:"Mosselmarkt Yerseke"},{date:"2 nov", title:"MTB-toertocht Westerschouwen"}].map((ev, i) => (
              <li key={i} className="flex items-center justify-between p-4">
                <div className="flex items-center gap-4">
                  <span className="text-sm px-2 py-1 rounded bg-neutral-100 border border-neutral-200">{ev.date}</span>
                  <span className="font-medium">{ev.title}</span>
                </div>
                <a href="#" className="text-sm underline">Details</a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
