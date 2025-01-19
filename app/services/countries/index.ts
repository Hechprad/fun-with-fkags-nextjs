import { ApiClient } from "@/app/services/api";

const countriesApiClient = ApiClient("https://restcountries.com/v3.1");

const baseFields = "capital,cca3,flags,name,population,region";

const countriesApi = {
  getAll: () => countriesApiClient.get(`/all?fields=${baseFields}`),
  getCountry: (cca3: string | null) =>
    countriesApiClient.get(
      `/alpha/${cca3}?fields=${baseFields},borders,currencies,languages,tld`
    ),
};

export { countriesApi };
