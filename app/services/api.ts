const ApiClient = (baseUrl: string) => ({
  async get(url: string) {
    try {
      const response = await fetch(`${baseUrl}${url}`);

      if (!response.ok) {
        return [null, response.statusText];
      }

      const data = await response.json();
      return [data, null];
    } catch (error: unknown) {
      console.error("API request failed", error);
      return [
        null,
        (error as { message?: string }).message ?? "Failed to fetch data",
      ];
    }
  },
});

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
