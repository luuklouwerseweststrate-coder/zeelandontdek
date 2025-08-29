export type RouteType = "Fiets" | "Wandel" | "MTB" | "Gravel";

export interface RouteItem {
  id: string;
  title: string;
  type: RouteType;
  distance_km: number;
  duration_min: number;
  difficulty: string;
  surface: string[];
  island: "Walcheren" | "Noord-Beveland" | "Zuid-Beveland" | "Schouwen-Duiveland" | "Tholen" | "Zeeuws-Vlaanderen";
  start: { lat: number; lng: number };
  gpx_url: string;
  image: string;
}

export const TYPES: RouteType[] = ["Fiets", "Wandel", "MTB", "Gravel"];
export const ISLANDS = [
  "Walcheren",
  "Noord-Beveland",
  "Zuid-Beveland",
  "Schouwen-Duiveland",
  "Tholen",
  "Zeeuws-Vlaanderen"
] as const;
