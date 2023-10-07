'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AiOutlineMenu } from 'react-icons/ai';
import { FiSearch } from 'react-icons/fi'
import { signOut } from 'next-auth/react';

import useRegister from "@app/hooks/useRegister";
import useLogin from "@app/hooks/useLogin";
import Avatar from '../Avatar';
import MenuItem from './MenuItem';
import { SafeUser } from '@common.types';

interface UserMenuProps {
  currentUser?: SafeUser | null
}

const UserMenu = ({ currentUser }: UserMenuProps) => {
  const registerModal = useRegister();
  const loginModal = useLogin();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <div className="flex items-center gap-3">
        <div
          onClick={() => router.push('/properties')}
          className="text-sm font-semibold py-3 px-4 rounded-full flex gap-2
          hover:bg-neutral-100 transition cursor-pointer max-sm:hidden"
        > 
          <FiSearch className="h-5 w-5" />
          Search
        </div>

        <div
          onClick={() => setIsOpen(!isOpen)}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex
            items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar />
          </div>
        </div>
      </div>

      {isOpen && (
        <div 
        className="z-10 absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white
          oveflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem 
                  href="/favorites"
                  label="My favorites" 
                  onClick={() => setIsOpen(false)}
                />
                <MenuItem 
                  href="/reservations"
                  label="My reservations" 
                  onClick={() => setIsOpen(false)}
                />
                <MenuItem 
                  label="Logout" 
                  onClick={signOut}
                />
              </>
            ) : (
              <>
                <MenuItem
                  label="Login"
                  onClick={loginModal.onOpen}
                />
                 <MenuItem
                  label="Sign up"
                  onClick={registerModal.onOpen}
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default UserMenu;
