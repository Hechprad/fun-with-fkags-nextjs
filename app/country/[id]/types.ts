import { Country } from "@/app/components/CardList/types";

export type Params = { id: string };

export type DetailedCountry = {
  borders: string[];
  currencies: { name: string; symbol: string }[];
  languages: { [key: string]: string }[];
  tld: string[];
} & Country;
