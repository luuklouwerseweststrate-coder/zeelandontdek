"use client";

import { useEffect, useMemo, useState } from "react";
import { RouteItem, TYPES, ISLANDS } from "@/components/types";
import RoutesMap from "@/components/RoutesMap";
import Pill from "@/components/Pill";

function Range({ label, value, min, max, step, onChange }: { label: string; value: number; min: number; max: number; step: number; onChange: (v:number)=>void }) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span>{label}</span>
        <span className="font-medium">{value} km</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e)=>onChange(Number(e.target.value))} className="w-full" />
      <div className="flex justify-between text-xs opacity-60"><span>{min} km</span><span>{max} km</span></div>
    </div>
  );
}

export default function RoutesPage() {
  const [view, setView] = useState<"lijst"|"kaart">("lijst");
  const [q, setQ] = useState("");
  const [types, setTypes] = useState<string[]>([...TYPES]);
  const [islands, setIslands] = useState<string[]>([...ISLANDS]);
  const [maxKm, setMaxKm] = useState(60);
  const [detail, setDetail] = useState<RouteItem|null>(null);
  const [favs, setFavs] = useState<string[]>([]);
  const [routes, setRoutes] = useState<RouteItem[]>([]);

  useEffect(() => {
    // favorites
    const raw = typeof window !== "undefined" ? localStorage.getItem("zeeland.routes.favs") : null;
    setFavs(raw ? JSON.parse(raw) : []);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("zeeland.routes.favs", JSON.stringify(favs));
    }
  }, [favs]);

  useEffect(() => {
    fetch("/data/routes.json").then(r=>r.json()).then(setRoutes);
  }, []);

  const filtered = useMemo(() => {
    const ql = q.trim().toLowerCase();
    return routes.filter(r => {
      const matchesQ = !ql || r.title.toLowerCase().includes(ql) || r.island.toLowerCase().includes(ql) || r.type.toLowerCase().includes(ql);
      const matchesType = types.includes(r.type);
      const matchesIsland = islands.includes(r.island);
      const matchesDist = r.distance_km <= maxKm;
      return matchesQ && matchesType && matchesIsland && matchesDist;
    });
  }, [routes, q, types, islands, maxKm]);

  function toggle(arr: string[], value: string, set: (v:string[])=>void) {
    set(arr.includes(value) ? arr.filter(x=>x!==value) : [...arr, value]);
  }

  return (
    <main className="border-t border-neutral-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <aside className="lg:col-span-1 bg-neutral-50 border border-neutral-200 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h1 className="font-semibold">Filters</h1>
              <div className="inline-flex items-center rounded-xl border border-neutral-200 p-1 text-sm">
                {[{value:"lijst",label:"Lijst"},{value:"kaart",label:"Kaart"}].map(opt=> (
                  <button key={String(opt.value)} onClick={()=>setView(opt.value as any)} className={`px-3 py-1.5 rounded-lg transition ${view===opt.value?"bg-neutral-900 text-white":"hover:bg-neutral-100"}`}>{opt.label}</button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="text-sm mb-1 block">Zoekwoord</label>
              <input type="text" placeholder="Zoek op titel, eiland of type" value={q} onChange={(e)=>setQ(e.target.value)} className="w-full rounded-lg border border-neutral-300 px-3 py-2" />
            </div>

            <div className="mb-4">
              <div className="text-sm mb-2">Type</div>
              <div className="grid grid-cols-2 gap-2">
                {TYPES.map(t => (
                  <button key={t} onClick={()=>toggle(types, t, setTypes)} className={`px-3 py-1.5 rounded-lg border text-sm ${types.includes(t)?"bg-neutral-900 text-white border-neutral-900":"border-neutral-300 hover:bg-neutral-100"}`}>{t}</button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <Range label="Maximale afstand" value={maxKm} min={5} max={60} step={1} onChange={setMaxKm} />
            </div>

            <div className="mb-2 text-sm">Eilanden</div>
            <div className="grid grid-cols-1 gap-2">
              {ISLANDS.map(name => (
                <label key={name} className="flex items-center gap-2 select-none cursor-pointer">
                  <input type="checkbox" className="w-4 h-4" checked={islands.includes(name)} onChange={()=>toggle(islands, name, setIslands)} />
                  <span>{name}</span>
                </label>
              ))}
            </div>

            <div className="mt-4 text-xs opacity-70">{filtered.length} resultaten · {routes.length} totaal</div>
          </aside>

          {/* Result */}
          <section className="lg:col-span-3">
            {view === "lijst" ? (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map(r => (
                  <article key={r.id} className="rounded-2xl border border-neutral-200 overflow-hidden bg-white">
                    <div className="h-40 bg-cover bg-center" style={{ backgroundImage: `url(${r.image})` }} />
                    <div className="p-4">
                      <h3 className="font-semibold leading-snug mb-1 line-clamp-2">{r.title}</h3>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <Pill>{r.type}</Pill>
                        <Pill>{r.distance_km} km</Pill>
                        <Pill>{r.island}</Pill>
                      </div>
                      <div className="flex items-center gap-3">
                        <a href={r.gpx_url} className="text-sm px-3 py-1.5 rounded-lg bg-neutral-900 text-white hover:bg-neutral-800">Download GPX</a>
                        <button onClick={()=>setDetail(r)} className="text-sm px-3 py-1.5 rounded-lg border border-neutral-300 hover:bg-neutral-50">Details</button>
                        <button onClick={()=> setFavs(f=> f.includes(r.id)? f.filter(x=>x!==r.id):[...f, r.id]) } className={`ml-auto text-sm px-3 py-1.5 rounded-lg border ${ (favs.includes(r.id)?"bg-yellow-50 border-yellow-300":"border-neutral-300 hover:bg-neutral-50")}`}>{favs.includes(r.id)?"In favorieten":"Favoriet"}</button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <RoutesMap routes={filtered} onSelect={(r)=>setDetail(r)} />
            )}
          </section>
        </div>
      </div>

      {/* Detail modal */}
      {detail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={()=>setDetail(null)}>
          <div className="w-full max-w-xl bg-white rounded-2xl overflow-hidden shadow-xl" onClick={(e)=>e.stopPropagation()}>
            <div className="h-44 bg-cover bg-center" style={{ backgroundImage: `url(${detail.image})` }} />
            <div className="p-4">
              <div className="flex items-start gap-3">
                <h3 className="text-lg font-semibold flex-1 pr-8">{detail.title}</h3>
                <button className="px-3 py-1.5 rounded-lg border border-neutral-300 hover:bg-neutral-50" onClick={()=>setDetail(null)}>Sluiten</button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                <Pill>{detail.type}</Pill>
                <Pill>{detail.distance_km} km</Pill>
                <Pill>{detail.island}</Pill>
                <Pill>Duur ± {Math.round(detail.duration_min / 60)} u</Pill>
                <Pill>{detail.difficulty}</Pill>
              </div>
              <p className="mt-3 text-sm opacity-80">Voorbeeldtekst voor routebeschrijving. In productie komt hier CMS-inhoud met POI’s, startpunten en praktische info.</p>
              <div className="mt-4 flex gap-3">
                <a href={detail.gpx_url} className="text-sm px-3 py-1.5 rounded-lg bg-neutral-900 text-white hover:bg-neutral-800">Download GPX</a>
                <button onClick={()=> setFavs(f=> f.includes(detail.id)? f.filter(x=>x!==detail.id):[...f, detail.id]) } className={`text-sm px-3 py-1.5 rounded-lg border ${ (favs.includes(detail.id)?"bg-yellow-50 border-yellow-300":"border-neutral-300 hover:bg-neutral-50")}`}>{favs.includes(detail.id)?"Verwijder uit favorieten":"Voeg toe aan favorieten"}</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
