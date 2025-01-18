"use client";

import { useEffect, useState } from "react";

import Card from "./components/Card";

import * as t from "./types";

const fetchCountries = (): Promise<Array<t.Country>> =>
  fetch(
    "https://restcountries.com/v3.1/all?fields=cca3,name,capital,region,population,flags"
  ).then((response) => response.json());

const CardList = () => {
  const [countries, setCountries] = useState<Array<t.Country>>([]);
  const [hasError, setHasError] = useState<string | null>(null);
  const [pending, setIsPending] = useState<boolean>(true);

  useEffect(() => {
    fetchCountries()
      .then((data) => setCountries(data))
      .catch(() => {
        setHasError("Failed to fetch data");
      })
      .finally(() => {
        setIsPending(false);
      });
  }, []);

  if (hasError) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-red-600">{hasError}</p>
        <button
          className="px-4 py-2 text-white bg-blue-500 rounded-md"
          onClick={() => {
            setHasError(null);
            setIsPending(true);
            fetchCountries()
              .then((data) => {
                setCountries(data);
              })
              .catch(() => {
                setHasError("Failed to fetch data");
              })
              .finally(() => {
                setIsPending(false);
              });
          }}
          disabled={pending}
        >
          try again
        </button>
      </div>
    );
  }

  return pending ? (
    <div className="flex items-center justify-center h-64">
      <p className="text-gray-600">Loading...</p>
    </div>
  ) : (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {countries.map((country, index) => (
        <Card key={country.cca3} country={country} index={index} />
      ))}
    </div>
  );
};

export default CardList;
