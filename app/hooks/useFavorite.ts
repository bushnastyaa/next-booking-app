import { SafeUser } from "@common.types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import useLogin from "./useLogin";

interface UseFavorite {
  propertyId: string;
  currentUser?: SafeUser | null
}

const useFavorite = ({ propertyId, currentUser }: UseFavorite) => {
  const router = useRouter();
  const loginModal = useLogin();

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];
    
    return list.includes(propertyId);
  }, [currentUser, propertyId]);

  const toggleFavorite = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    if (!currentUser) {
      return loginModal.onOpen();
    }

    try {
      let request;

      if (!hasFavorited) {
        request = () => axios.post(`/api/favorites/${propertyId}`);
      } else {
        request = () => axios.delete(`/api/favorites/${propertyId}`);
      }

      await request();
      router.refresh();
      toast.success('Success');
    } catch (error) {
      toast.error('Something went wrong.');
    }
  }, 
  [
    currentUser, 
    hasFavorited, 
    propertyId, 
    loginModal,
    router
  ]);

  return {
    hasFavorited,
    toggleFavorite,
  }
};

export default useFavorite;
