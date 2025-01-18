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

const countriesApi = {
  getAll: () =>
    countriesApiClient.get(
      "/all?fields=cca3,name,capital,region,population,flags"
    ),
};

export { countriesApi };
