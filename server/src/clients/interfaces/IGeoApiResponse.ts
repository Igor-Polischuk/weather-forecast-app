/* eslint-disable prettier/prettier */

export interface IGeoApiResponseItem {
  name: string;
  local_names: Record<string, string>;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

export type GeoApiResponse = IGeoApiResponseItem[];