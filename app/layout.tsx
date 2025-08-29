import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zeeland Routes",
  description: "Fietsen en wandelen in Zeeland – routes met kaart en filters",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <body className="min-h-screen bg-gradient-to-b from-sky-50 to-white text-neutral-900">
        <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b border-neutral-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-6">
            <div className="shrink-0 font-semibold tracking-tight text-lg">Zeeland Routes</div>
            <nav className="hidden md:flex gap-5 text-sm">
              <a className="hover:underline" href="#ontdek">Ontdek Zeeland</a>
              <a className="hover:underline" href="#zien">Zien & Doen</a>
              <a className="hover:underline" href="#slapen">Blijven slapen</a>
              <a className="hover:underline" href="#eten">Eten & Drinken</a>
              <a className="hover:underline font-medium" href="/routes">Routes</a>
              <a className="hover:underline" href="#agenda">Agenda</a>
            </nav>
            <div className="ml-auto flex items-center gap-2">
              <a
                href="/routes"
                className="text-sm px-3 py-1.5 rounded-lg bg-neutral-900 text-white hover:bg-neutral-800"
              >
                Bekijk routes
              </a>
            </div>
          </div>
        </header>
        {children}
        <footer className="mt-16 border-t border-neutral-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid md:grid-cols-3 gap-8 text-sm">
            <div>
              <div className="font-semibold mb-2">Over Zeeland Routes</div>
              <p className="opacity-80">MVP met kaart/lijst en filters. Later koppelen we CMS en events.</p>
            </div>
            <div>
              <div className="font-semibold mb-2">Contact</div>
              <p className="opacity-80">E-mail: info@example.nl<br/>Telefoon: 0118 – 000 000</p>
            </div>
            <div>
              <div className="font-semibold mb-2">Nieuwsbrief</div>
              <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <input type="email" placeholder="Je e-mailadres" className="flex-1 rounded-lg border border-neutral-300 px-3 py-2" />
                <button className="px-4 py-2 rounded-lg bg-neutral-900 text-white hover:bg-neutral-800">Aanmelden</button>
              </form>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
