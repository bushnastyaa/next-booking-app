'use client';

import { SafeUser } from "@common.types";
import Logo from "./Logo";
import UserMenu from "./UserMenu";

interface NavbarProps {
  currentUser?: SafeUser | null;
}

const Navbar = ({ currentUser }: NavbarProps) => {
  return (
    <div className="w-full bg-white z-10">
      <div className="py-4">
        <div className="max-width padding-x">
          <div 
            className="flex items-center justify-between gap-3 md:gap-0"
          >
            <Logo />

            <UserMenu currentUser={currentUser} />
          </div>
        </div>
      </div>
    </div>
  )
};

export default Navbar;
