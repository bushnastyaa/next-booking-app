import getCurrentUser from "@app/actions/getCurrentUser";
import getFavorites from "@app/actions/getFavorites";
import EmptyState from "@app/components/EmptyState";
import PropertyCard from "@app/components/properties/PropertyCard";

export default async function Favorites () {
  const currentUser = await getCurrentUser();
  const data = await getFavorites();

  return (
    <div className="border-t">
      <div className="max-width padding-x padding-y">
        <div className="w-full max-w-[1160px] mx-auto mt-10">
          <div className="mb-5">
            <h2 className="font-bold text-2xl">Your favorites</h2>
            <p className="text-gray-500 mt-1">List of places you favorited</p>
          </div>
    
          {data.length === 0 
            ? (
              <EmptyState
                title="No favorites found"
                subtitle="Looks like you have no favorite properties"
              />
            ) : (
              <div className="flex gap-5 flex-wrap">
                {data.map((item) => (
                  <PropertyCard key={item.id} item={item} currentUser={currentUser} />
                ))}
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
};
