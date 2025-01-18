import Card from "./Card";

// @TODO - remove after API integration
const mockCountries = [
  {
    name: "Japan",
    id: 1,
    region: "Asia",
    population: 126476461,
    capital: "Tokyo",
  },
  {
    name: "Brazil",
    id: 2,
    region: "South America",
    population: 214000000,
    capital: "Brasília",
  },
  {
    name: "Australia",
    id: 3,
    region: "Oceania",
    population: 26000000,
    capital: "Canberra",
  },
  {
    name: "Australia",
    id: 4,
    region: "Oceania",
    population: 26000000,
    capital: "Canberra",
  },
  {
    name: "Australia",
    id: 5,
    region: "Oceania",
    population: 26000000,
    capital: "Canberra",
  },
];

const CardList = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {mockCountries.map((country) => (
        <Card key={country.id} country={country} />
      ))}
    </div>
  );
};
export default CardList;
