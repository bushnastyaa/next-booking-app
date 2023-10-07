'use client';

import { BsEye } from 'react-icons/bs';
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from "react";
import { format } from 'date-fns';

import Button from "../Button";
import HeartButton from "@app/components/HeartButton";
import { Property } from "@prisma/client";
import { SafeReservation, SafeUser } from '@common.types';

interface PropertyProps {
  item: Property;
  reservation?: SafeReservation;
  currentUser?: SafeUser | null;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
}

const PropertyCard = ({ 
  item, 
  reservation, 
  currentUser,
  onAction,
  disabled,
  actionLabel,
  actionId = '',
}: PropertyProps) => {
  const router = useRouter();

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (disabled) {
      return;
    }

    onAction?.(actionId)
  }, [disabled, onAction, actionId]);

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }

    return item.price;
  }, [reservation, item.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }
  
    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, 'PP')} - ${format(end, 'PP')}`;
  }, [reservation]);

  return (
    <div className="hover:shadow-lg hover:rounded-xl">
      <div className="relative overflow-hidden aspect-square w-[275px]">
        <Image
          src={item.imageSrc}
          alt="property"
          fill
          className="object-cover h-full w-full rounded-t-xl z-0"
        />
  
        <HeartButton 
          propertyId={item.id} 
          currentUser={currentUser}
        />
      </div>
  
      <div className="bg-white rounded-xl shadow-lg p-4">
        <div className="flex justify-between items-center">
           <span className="font-bold">{item.name}</span>
           <span className='flex gap-1 text-xs text-gray-500'>
             <BsEye className="h-4 w-4 text-[#0071c2]" />
             {item.views} views
           </span>
        </div>
        <p className="text-sm text-gray-500">{item.location}, {item.address}</p>
        <div className="text-gray-500 text-xs mt-1">
          {reservationDate || item.category}
        </div>
        <hr className="my-3 border rounded-full" />

        <div className="flex items-center gap-1 mb-1">
          <div className="font-semibold text-md">${price}</div>
          {!reservation && (
            <div className="text-sm text-gray-500">/day</div>
          )}
        </div>
        {onAction && actionLabel ? (
          <Button
            disabled={disabled}
            label={actionLabel} 
            small
            onClick={handleCancel}
          />
        ) : (
          <Button
            label='Booking now'
            small
            onClick={() => router.push(`/property/${item.id}`)}
          />
        )}
      </div>

    </div>
  )
};

export default PropertyCard;
