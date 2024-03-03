'use client';

import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Range } from "react-date-range";
import { differenceInDays, eachDayOfInterval } from 'date-fns';

import { FaLocationDot } from 'react-icons/fa6';
import Image from 'next/image';
import { Property, Reservation } from '@prisma/client';
import { SafeUser } from '@common.types';
import useLoginModal from '@app/hooks/useLogin';
import { categories } from "@app/components/Categories";
import HeartButton from '@app/components/HeartButton';
import PropertyInfo from "@app/components/properties/PropertyInfo";
import PropertyReservation from "@app/components/properties/PropertyReservation";

interface PropertyClientProps {
  reservations?: Reservation[];
  property: Property & {
    user: SafeUser;
  };
  currentUser?: SafeUser | null;
}

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection'
};

const PropertyClient = ({ reservations = [], property, currentUser }: PropertyClientProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(property.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);
  const loginModal = useLoginModal();
  const router = useRouter();

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservation: any) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate)
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  const category = useMemo(() => {
     return categories.find((items) => 
      items.label === property.category);
  }, [property.category]);

  const onCreateReservation = useCallback(() => {
      if (!currentUser) {
        return loginModal.onOpen();
      }
      setIsLoading(true);

      axios.post('/api/reservations/new', {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        propertyId: property?.id
      })
      .then(() => {
        toast.success('Property reserved!');
        setDateRange(initialDateRange);
        router.push('/reservations');
      })
      .catch(() => {
        toast.error('Something went wrong.');
      })
      .finally(() => {
        setIsLoading(false);
      })
  },
  [
    totalPrice, 
    dateRange, 
    property?.id,
    router,
    currentUser,
    loginModal
  ]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInDays(
        dateRange.endDate, 
        dateRange.startDate
      );
      
      if (dayCount && property.price) {
        setTotalPrice(dayCount * property.price);
      } else {
        setTotalPrice(property.price);
      }
    }
  }, [dateRange, property.price]);
    
  return (
    <div className="max-md:px-5 w-full max-w-[1160px] mx-auto">
      <div className="flex flex-col gap-1 relative">
        <h1 className="text-2xl font-bold">{property.name}</h1>
        <div className="flex items-center gap-2">
          <FaLocationDot className="h-4 w-4" />
          <span>{property.location}, {property.address}</span>
        </div>
      </div>
        
      <div className="w-full h-[600px] max-md:h-[300px] overflow-hidden rounded-xl relative mt-5">
        <Image
          src={property.imageSrc}
          alt="image"
          fill
          className="object-cover w-full"
        />
        <HeartButton 
          propertyId={property.id} 
          currentUser={currentUser}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
        <PropertyInfo
          category={category}
          title={property.title}
          description={property.desc}
          roomCount={property.roomCount}
          guestCount={property.guestCount}
          bathroomCount={property.bathroomCount}
        />
        <div className="order-first mb-10 md:order-last md:col-span-3">
          <PropertyReservation
            price={property.price}
            totalPrice={totalPrice}
            onChangeDate={(value) => setDateRange(value)}
            dateRange={dateRange}
            onSubmit={onCreateReservation}
            disabled={isLoading}
            disabledDates={disabledDates}
          />
        </div>
      </div>
  
    </div>
  )
}

export default PropertyClient;
