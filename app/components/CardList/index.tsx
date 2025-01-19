"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { countriesApi } from "@/app/services/countries";
import { Country } from "@/app/services/countries/types";

import Card from "./components/Card";

const CardList = () => {
  const [countries, setCountries] = useState<Array<Country>>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [pending, setIsPending] = useState<boolean>(true);

  const fetchCountries = async (): Promise<Array<Country> | undefined> => {
    const [response, error] = await countriesApi.getAll();

    setIsPending(false);

    if (error) {
      setErrorMessage(error as string);
      return;
    }

    setCountries(response as unknown as Array<Country>);
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  if (pending) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

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
          type="button"
        >
          try again
        </button>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {countries.map((country, index) => (
        <Link href={`/country/${country.cca3}`} key={country.cca3}>
          <Card country={country} index={index} />
        </Link>
      ))}
    </div>
  );
};

export default CardList;
