'use client';

import { toast } from "react-hot-toast";
import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import PropertyCard from "@app/components/properties/PropertyCard";
import { SafeReservation, SafeUser } from "@common.types";

interface ReservationsProps {
  reservations: SafeReservation[],
  currentUser?: SafeUser | null,
}

const ReservationsClient = ({
  reservations,
  currentUser
}: ReservationsProps) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');

  const onCancel = useCallback((id: string) => {
    setDeletingId(id);

    axios.delete(`/api/reservations/${id}`)
    .then(() => {
      toast.success('Reservation cancelled');
      router.refresh();
    })
    .catch((error) => {
      toast.error(error?.response?.data?.error)
    })
    .finally(() => {
      setDeletingId('');
    })
  }, [router]);

  return (
    <div className="flex gap-5 flex-wrap">
      {reservations.map((reservation: any) => (
        <PropertyCard
          key={reservation.id}
          item={reservation.property}
          reservation={reservation}
          currentUser={currentUser}
          actionId={reservation.id}
          onAction={onCancel}
          disabled={deletingId === reservation.id}
          actionLabel="Cancel reservation"
        />
      ))}
    </div>
   );
};
 
export default ReservationsClient;
