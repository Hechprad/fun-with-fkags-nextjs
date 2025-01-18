import Image from "next/image";

import { Country } from "../types";

type CardProps = {
  country: Country;
  index: number;
};

const Card = ({
  country: { capital, flags, name, population, region },
  index,
}: CardProps) => {
  return (
    <div className="h-full overflow-hidden bd-white rounded-lg shadow-lg">
      <div className="aspect-video w-full">
        <Image
          alt={`${name.common ?? "not found"} flag`}
          className="w-full h-full object-cover"
          height={250}
          priority={index < 12}
          src={flags.svg ?? "https://placehold.co/600X400"}
          width={400}
        />
      </div>
      <div className="p-6 text-sm text-gray-600">
        <h2 className="text-xl font-semibold mb-4">{name.common}</h2>
        <div className="space-y-2">
          <div className="flex - items-center gap-1">
            <span className="font-semibold">Capital:</span>
            <span>{capital?.[0] ?? "not found"}</span>
          </div>
          <div className="flex - items-center gap-1">
            <span className="font-semibold">Region:</span>
            <span>{region}</span>
          </div>
          <div className="flex - items-center gap-1">
            <span className="font-semibold">Population:</span>
            <span>{population}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
