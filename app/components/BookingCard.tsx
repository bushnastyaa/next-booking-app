'use client';

import qs from 'query-string';
import { Range } from 'react-date-range';
import { formatISO, format } from 'date-fns';
import { useCallback, useMemo, useState } from "react";
import { BsCursor, BsCalendar2Week, BsPerson } from 'react-icons/bs'
import { FiSearch } from 'react-icons/fi'
import { useRouter, useSearchParams } from 'next/navigation';

import Calendar from "./inputs/Calendar";
import Counter from "./inputs/Counter";
import Selector from './inputs/Selector';

const BookingCard = () => {
  const router = useRouter();
  const params = useSearchParams();

  const  locationValue = params?.get('location') || 'Choose your destination'; 
  const  startDate = params?.get('startDate') || new Date();
  const  endDate = params?.get('endDate') || new Date();
  const  guests = params?.get('guestCount') || 2;
  const  rooms = params?.get('roomCount') || 1;
  const  bathrooms = params?.get('bathroomCount') || 1;

  const [location, setLocation] = useState(locationValue);
  const [openDate, setOpenDate] = useState(false);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(startDate),
    endDate: new Date(endDate),
    key: 'selection'
  });
  const [openOptions, setOpenOptions] = useState(false);
  const [guestCount, setGuestCount] = useState(guests);
  const [roomCount, setRoomCount] = useState(rooms);
  const [bathroomCount, setBathroomCount] = useState(bathrooms);

  const onSubmit = useCallback(async () => {
    setOpenOptions(false)
    setOpenDate(false) 
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString())
    }

    const updatedQuery: any = {
      ...currentQuery,
      location,
      guestCount,
      roomCount,
      bathroomCount
    };

    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate);
    }

    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate);
    }

    const url = qs.stringifyUrl({
      url: '/properties',
      query: updatedQuery,
    }, { skipNull: true });

    router.push(url, { scroll: false });
  }, 
  [
    location, 
    router, 
    guestCount, 
    roomCount,
    dateRange,
    bathroomCount,
    params
  ]);

  return (
    <div className="z-10 absolute w-full -bottom-[3.75rem] max-lg:-bottom-[15.75rem] 
      pr-[154px] max-md:pr-20 max-sm:pr-10">
      <div className="rounded-2xl shadow-md bg-white opacity-95 p-7 text-black">
        <span className="font-medium text-gray-500 border-b border-black pb-[22.5px]">
          Choose your stay
        </span>
        <hr className="mt-5" />
        
        <div className="flex justify-between mt-5 max-lg:gap-7 max-lg:flex-col">
          <div className="flex gap-3">
            <BsCursor className="h-5 w-5 mt-1 text-gray-400" />
            <div 
              className="flex flex-col" 
              onClick={() => { 
                setOpenDate(false) 
                setOpenOptions(false)
              }}>
              <label htmlFor="location" className="text-lg font-bold">Location</label>
              <Selector
                onChange={(value) => setLocation(value)}
                value={location} 
              />
            </div>
          </div>

          <div className="flex gap-3">
            <BsCalendar2Week className="h-5 w-5 mt-1 text-gray-400" />
            <div className="flex flex-col">
              <span className="text-lg font-bold">Date</span>
              <span
                  onClick={() => { 
                    setOpenDate(!openDate) 
                    setOpenOptions(false)
                  }}
                  className="text-gray-400 text-sm relative cursor-pointer"
                >
                  {/* @ts-ignore */}
                  {format(dateRange.startDate, 'PP')} - {format(dateRange.endDate, 'PP')}
              </span>
              {openDate && (
                <div className="absolute top-[9rem] max-lg:top-[14rem] 
                rounded-xl shadow-xl bg-white z-10">
                  <Calendar
                    onChange={(value) => setDateRange(value.selection)}
                    value={dateRange}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-3">
            <BsPerson className="h-6 w-6 mt-1 text-gray-400" />
            <div className="flex flex-col">
              <span className="text-lg font-bold">Travelers</span>
              <span
                onClick={() => {
                  setOpenOptions(!openOptions)
                  setOpenDate(false) 
                }}
                className="text-sm text-gray-400 relative z-0 cursor-pointer"
              >
                {guestCount} guest{Number(guestCount) > 1 ? "s" : "" } · {" "}
                {roomCount} room{Number(roomCount) > 1 ? "s" : "" } ·  {" "}
                {bathroomCount} bathroom{Number(bathroomCount) > 1 ? "s" : "" }
              </span>
              {openOptions && (
                <div className="absolute top-[9rem] max-lg:top-[19rem]
                p-4 rounded-xl shadow-xl bg-white">
                  <div className="flex flex-col gap-5">
                    <Counter 
                      onChange={(value) => setGuestCount(value)}
                      value={guestCount}
                      title="Guests" 
                      subtitle="How many guests?"
                    />
                    <hr />
                    <Counter 
                      onChange={(value) => setRoomCount(value)}
                      value={roomCount}
                      title="Rooms" 
                      subtitle="How many rooms?"
                    />        
                    <hr />
                    <Counter 
                      onChange={(value) => {
                        setBathroomCount(value)
                      }}
                      value={bathroomCount}
                      title="Bathrooms"
                      subtitle="How many bathrooms?"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={onSubmit}
            type="button"
            className="p-4 text-white bg-[#0071c2] rounded-xl flex items-center justify-center gap-1">
              <FiSearch className="h-5 w-5" />
              <span className="max-xl:hidden max-lg:block block">Search</span>
          </button>
        </div>

      </div>
    </div>
  )
}

export default BookingCard;
