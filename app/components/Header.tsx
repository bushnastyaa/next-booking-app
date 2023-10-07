'use client';

import { SafeUser } from '@common.types';
import useLogin from '@app/hooks/useLogin';
import BookingCard from './BookingCard';

interface HeaderProps {
  currentUser?: SafeUser | null;
}

const Header = ({ currentUser }: HeaderProps) => {
  const loginModal = useLogin();
  
  return (
    <div className="bg-hero object-contain rounded-3xl max-md:rounded-none text-white z-0">
      <div className="w-full px-20 pt-24 pb-56 max-md:px-10 max-sm:px-5 relative">
        <h1 className="text-[50px] max-sm:text-4xl font-bold leading-tight">
          Find A Place For <br className="max-md:hidden" /> Your Next Stay
        </h1> 
        <p className="mt-7 text-lg max-sm:text-base">
          Get rewarded for your travels - unlock instant 
          <br className="max-sm:hidden"/> savings 
          of 10% or more with free Booking account
        </p>
        {!currentUser &&
          <button 
            onClick={loginModal.onOpen}
            className="bg-[#0071c2] text-white p-3 mt-5 rounded-xl"
          >
            Start your search
          </button>
        }

        <BookingCard />
      </div>
    </div>
  )
}

export default Header;
