"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

import { countriesApi } from "@/app/services/countries";
import { DetailedCountry } from "@/app/services/countries/types";

import * as t from "./types";

export default function Country() {
  const params = useParams<t.Params>();

  const [country, setCountry] = useState<DetailedCountry | null>(null);
  const [id, setId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [pending, setIsPending] = useState<boolean>(true);

  const fetchCountries = useCallback(async (): Promise<
    DetailedCountry | undefined
  > => {
    const [response, error] = await countriesApi.getCountry(id);

    setIsPending(false);

    if (error) {
      setErrorMessage(error as string);
      return;
    }

    setCountry(response as unknown as DetailedCountry);
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
          type="button"
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
          <button
            className="bg-gray-200 hover:bg-gray-300 font-semibold py-2 px-4 rounded"
            type="button"
          >
            Go Back
          </button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-4">
        <div className="flex items-center md:max-w-[400px]">
          <Image
            alt={`${country.name.common ?? "not found"} flag`}
            className="rounded-lg"
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
            <div>
              <span className="font-semibold">Capital:</span>{" "}
              {country.capital?.[0] ?? "not found"}
            </div>
            <div>
              <span className="font-semibold">Region:</span> {country.region}
            </div>
            <div>
              <span className="font-semibold">Population:</span>{" "}
              {country.population}
            </div>
            <div>
              <span className="font-semibold">Languages:</span>{" "}
              {Object.values(country.languages ?? {}).join(", ")}
            </div>
            <div>
              <span className="font-semibold">Currencies:</span>{" "}
              {Object.values(country.currencies ?? {})
                .map(({ name, symbol }) => `${name} (${symbol})`)
                .join(", ")}
            </div>
            <div>
              <span className="font-semibold">Top Level Domain:</span>{" "}
              {country.tld.join(", ")}
            </div>
            <div>
              <div className="md:max-w-80 flex flex-wrap gap-1 font-semibold">
                <span className="font-semibold">Borders:</span>
                {country.borders.length
                  ? country.borders.map((item) => (
                      <Link href={`/country/${item}`} key={item}>
                        <button
                          className="bg-gray-200 hover:bg-gray-300 p-1 rounded text-xs font-normal"
                          type="button"
                        >
                          {item}
                        </button>
                      </Link>
                    ))
                  : "None"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : null;
}
