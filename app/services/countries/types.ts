export type Country = {
  capital?: Array<string>;
  cca3: number;
  flags: { svg?: string };
  name: { common?: string };
  population: number;
  region: string;
};

export type DetailedCountry = {
  borders: Array<string>;
  currencies: Record<string, { name: string; symbol: string }>;
  languages: Record<string, string>;
  tld: Array<string>;
} & Country;
