'use client';

import Link from "next/link";

interface MenuItemProps {
  onClick: () => void;
  label: string;
  href?: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ onClick, label, href }) => {
  return (
    <>
      {href ? (
        <Link
          href={href}
          onClick={onClick}
          className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
        >
          {label}
        </Link>
      ) : (
        <div
          onClick={onClick}
          className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
        >
          {label}
        </div>
      )}
    </>
  )
}

export default MenuItem;
