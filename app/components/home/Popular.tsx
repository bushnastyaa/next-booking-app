import { SafeUser } from '@common.types';
import { Property } from '@prisma/client';
import PropertyCard from '@app/components/properties/PropertyCard';

interface PopularProps {
  currentUser: SafeUser | null;
  popular: Property[];
}

const Popular = ({ currentUser, popular }: PopularProps) => {

  return (
    <div className="flex justify-between flex-wrap 
    max-xl:justify-center max-xl:gap-5 max-md:gap-2">
      {popular.map((item) => (
        <PropertyCard key={item.id} item={item} currentUser={currentUser} />
      ))}
    </div>
  )
};

export default Popular;
