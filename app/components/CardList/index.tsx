"use client";

import { useEffect, useState } from "react";

import { countriesApi } from "@/app/services/api";

import Card from "./components/Card";

import * as t from "./types";

const CardList = () => {
  const [countries, setCountries] = useState<Array<t.Country>>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [pending, setIsPending] = useState<boolean>(true);

  const fetchCountries = async (): Promise<Array<t.Country> | undefined> => {
    const [response, error] = await countriesApi.getAll();

    setIsPending(false);

    if (error) {
      setErrorMessage(error as string);
      return;
    }

    setCountries(response as unknown as Array<t.Country>);
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  if (errorMessage) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <p className="text-red-600">{errorMessage}</p>
        <button
          className="px-4 py-2 text-white bg-blue-500 rounded-md"
          onClick={() => {
            setErrorMessage(null);
            setIsPending(true);
            fetchCountries();
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
