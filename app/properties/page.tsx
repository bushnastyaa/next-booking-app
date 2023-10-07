import Header from '@app/components/Header';
import Categories from '@app/components/Categories';
import PropertyCard from '@app/components/properties/PropertyCard';
import getCurrentUser from '@app/actions/getCurrentUser';
import getProperties, { PropertiesParams } from '@app/actions/getProperties';
import EmptyState from '@app/components/EmptyState';

interface PropertiesProps {
  searchParams: PropertiesParams
};

export default async function Properties ({ searchParams }: PropertiesProps) {
  const currentUser = await getCurrentUser();
  const data = await getProperties(searchParams);
  
  return (
    <div className="padding-x padding-y max-width max-md:p-0">
      <Header currentUser={currentUser} />
      <Categories />

      {data.length === 0
        ? <EmptyState showReset />
        : (
          <div className="flex gap-5 flex-wrap max-2xl:justify-center
          max-lg:gap-2 w-full max-w-[1160px] mx-auto mt-5">
            {data.map((item) => (
              <PropertyCard key={item.id} item={item} currentUser={currentUser} />
            ))}
          </div>
        )
      }
    </div>
  )
};
