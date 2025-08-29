"use client";

import { useEffect, useMemo, useRef } from "react";
import type { RouteItem } from "@/components/types";

export default function RoutesMap({ routes, onSelect }: { routes: RouteItem[]; onSelect?: (r: RouteItem)=>void }) {
  const mapRef = useRef<HTMLDivElement|null>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  const center = useMemo(() => {
    if (!routes.length) return [3.55, 51.55] as [number, number];
    const lng = routes.reduce((s, r) => s + r.start.lng, 0) / routes.length;
    const lat = routes.reduce((s, r) => s + r.start.lat, 0) / routes.length;
    return [lng, lat] as [number, number];
  }, [routes]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const maplibregl = (await import("maplibre-gl")).default;
      if (cancelled) return;
      const container = mapRef.current!;
      if (!container) return;

      const map = new maplibregl.Map({
        container,
        style: {
          version: 8,
          sources: {
            osm: {
              type: "raster",
              tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
              tileSize: 256,
              attribution: "© OpenStreetMap"
            }
          },
          layers: [ { id: "osm", type: "raster", source: "osm", minzoom: 0, maxzoom: 19 } ]
        },
        center,
        zoom: 9
      });

      mapInstanceRef.current = map;
      map.on("load", drawMarkers);
    })();

    return () => {
      cancelled = true;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => { drawMarkers(); }, [routes]);

  async function drawMarkers() {
    const map = mapInstanceRef.current;
    if (!map) return;

    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    const { Marker, Popup } = await import("maplibre-gl");

    routes.forEach((r) => {
      const el = document.createElement("div");
      el.className = `w-3 h-3 rounded-full border border-white shadow ${r.type==="Wandel"?"bg-green-600": r.type==="MTB"?"bg-red-600": r.type==="Gravel"?"bg-yellow-600":"bg-blue-600"}`;

      const popupHtml = `
        <div style="font-family: system-ui, sans-serif; min-width:220px">
          <div style="font-weight:600; margin-bottom:4px">${r.title}</div>
          <div style="font-size:12px; opacity:0.8">${r.type} · ${r.distance_km} km · ${r.island}</div>
          <button id="sel-${r.id}" style="margin-top:8px; padding:6px 10px; border:1px solid #ddd; border-radius:6px; cursor:pointer">Toon details</button>
        </div>`;

      const marker = new Marker({ element: el })
        .setLngLat([r.start.lng, r.start.lat])
        .setPopup(new Popup({ offset: 12 }).setHTML(popupHtml))
        .addTo(map);

      marker.getElement().addEventListener("click", () => {
        setTimeout(() => {
          const btn = document.getElementById(`sel-${r.id}`);
          if (btn) (btn as HTMLButtonElement).onclick = () => onSelect && onSelect(r);
        }, 0);
      });

      markersRef.current.push(marker);
    });

    map.easeTo({ center, essential: true, duration: 600 });
  }

  return <div ref={mapRef} className="w-full h-[520px] rounded-2xl overflow-hidden bg-neutral-100" />;
}
