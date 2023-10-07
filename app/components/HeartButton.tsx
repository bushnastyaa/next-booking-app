'use client';

import { BsHeart, BsHeartFill  } from 'react-icons/bs';

import useFavorite from "@app/hooks/useFavorite";
import { SafeUser } from '@common.types';

interface HeartButtonProps {
  propertyId: string;
  currentUser?: SafeUser | null
}

const HeartButton: React.FC<HeartButtonProps> = ({ 
  propertyId,
  currentUser
}) => {
  const { hasFavorited, toggleFavorite } = useFavorite({
    propertyId,
    currentUser
  });

  return (
    <div 
      onClick={toggleFavorite}
      className="bg-white p-1.5 cursor-pointer 
      rounded-full absolute top-3 right-3 opacity-90"
    >
      {hasFavorited 
        ? <BsHeartFill className="h-5 w-5 text-rose-500" />
        : <BsHeart className="h-5 w-5 text-gray-500" />
      }
    </div>
   );
}
 
export default HeartButton;
