import getCurrentUser from "@app/actions/getCurrentUser";
import EmptyState from "@app/components/EmptyState";
import getReservations from "@app/actions/getReservations";
import ReservationsClient from "./ReservationsClient";

export default async function Reservations () {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <EmptyState
        title="Unauthorized"
        subtitle="Please login"
      />
    );
  }

  const reservations = await getReservations({ userId: currentUser.id });

  return (
    <div className="border-t">
      <div className="max-width padding-x padding-y">
        <div className="w-full max-w-[1160px] mx-auto mt-10">
          <div className="mb-5">
            <h2 className="font-bold text-2xl">Your reservations</h2>
            <p className="text-gray-500 mt-1">Let's go on an adventure</p>
          </div>
          
          {reservations.length === 0 
            ? (
              <EmptyState
                title="No reservations found"
                subtitle="Looks like you have no reservations"
              />
            ) : (
              <ReservationsClient 
                reservations={reservations}
                currentUser={currentUser}
              />
            )
          }
    
        </div>
      </div>
    </div>
  )
};
