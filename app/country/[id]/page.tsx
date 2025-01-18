"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

import { countriesApi } from "@/app/services/api";

import * as t from "./types";

const baseItemsCSS = "flex items-start gap-1";

export default function Country() {
  const params = useParams<t.Params>();

  const [country, setCountry] = useState<t.DetailedCountry | null>(null);
  const [id, setId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [pending, setIsPending] = useState<boolean>(true);

  const fetchCountries = useCallback(async (): Promise<
    t.DetailedCountry | undefined
  > => {
    const [response, error] = await countriesApi.getCountry(id);

    setIsPending(false);

    if (error) {
      setErrorMessage(error as string);
      return;
    }

    setCountry(response as unknown as t.DetailedCountry);
  }, [id]);

  useEffect(() => {
    if (params?.id && params.id !== id) {
      setId(params.id);
    }
  }, [id, params.id]);

  useEffect(() => {
    if (id) {
      fetchCountries();
    }
  }, [fetchCountries, id]);

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
        >
          try again
        </button>
      </div>
    );
  }

  return country ? (
    <>
      <div className="mb-8">
        <Link href="/">
          <button className="bg-gray-200 hover:bg-gray-300 font-semibold py-2 px-4 rounded">
            Go Back
          </button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-4">
        <div className="w-full md:max-w-[400px]">
          <Image
            alt={`${country.name.common ?? "not found"} flag`}
            className="w-full h-full object-cover"
            height={250}
            priority
            src={country.flags.svg ?? "/default-flag-600x400.svg"}
            width={500}
          />
        </div>
        <div className="flex flex-col justify-center p-6 text-sm text-gray-600">
          <h2 className="text-xl font-semibold mb-4">
            {country.name.common} ({id})
          </h2>
          <div className="space-y-2">
            <div className={baseItemsCSS}>
              <span className="font-semibold">Capital:</span>
              <span>{country.capital?.[0] ?? "not found"}</span>
            </div>
            <div className={baseItemsCSS}>
              <span className="font-semibold">Region:</span>
              <span>{country.region}</span>
            </div>
            <div className={baseItemsCSS}>
              <span className="font-semibold">Population:</span>
              <span>{country.population}</span>
            </div>
            <div className={baseItemsCSS}>
              <span className="font-semibold">Languages:</span>
              <span>{Object.values(country.languages).join(", ")}</span>
            </div>
            <div className={baseItemsCSS}>
              <span className="font-semibold">Currencies:</span>
              <span>
                {Object.values(country.currencies)
                  .map(({ name, symbol }) => `${name} - (${symbol})`)
                  .join(", ")}
              </span>
            </div>
            <div className={baseItemsCSS}>
              <span className="font-semibold">Top Level Domain:</span>
              <span>{country.tld.join(", ")}</span>
            </div>
            <div className={baseItemsCSS}>
              <span className="font-semibold">Borders:</span>
              <div className="flex flex-wrap gap-1">
                {country.borders.map((item) => (
                  <Link href={`/country/${item}`} key={item}>
                    <div className="bg-gray-200 p-1 rounded">
                      <span>{item}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : null;
}
