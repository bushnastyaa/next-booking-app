import { IconType } from "react-icons";
import { SafeUser } from "@common.types";

interface PropertyInfoProps {
  title: string;
  description: string;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  category: {
    icon: IconType,
    label: string;
    description: string;
  } | undefined
}

const PropertyInfo = ({
  title,
  description,
  guestCount,
  roomCount,
  bathroomCount,
  category,
}: PropertyInfoProps) => {
  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">{title}</h1>
        <div className="flex items-center gap-4 font-light text-neutral-500">
          <div>{guestCount} guests</div>
          <div>{roomCount} rooms</div>
          <div>{bathroomCount} bathrooms</div>
        </div>
      </div>

      {category && (
        <div className="flex flex-col">
          <div className="text-lg font-semibold">
            {category.label}
          </div>
          <div className="text-neutral-500 font-light">
            {category.description}
          </div>
        </div>
      )}

      <div className="text-lg font-light text-neutral-500">
        {description}
      </div>
    </div>
  )
}

export default PropertyInfo;
