'use client';

import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/">
      <Image 
        src="/booking.svg"
        alt="logo"
        className="cursor-pointer"
        height={140}
        width={140}
        priority
      />
    </Link>
  )
};

export default Logo;
