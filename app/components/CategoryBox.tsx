'use client';

import qs from 'query-string';
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { IconType } from "react-icons";

interface CategoryBoxProps {
  icon: IconType,
  label: string;
  selected?: boolean;
}

const CategoryBox = ({ icon: Icon, label, selected }: CategoryBoxProps) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {};
    
    if (params) {
      currentQuery = qs.parse(params.toString())
    }

    const updatedQuery: any = {
      ...currentQuery,
      category: label
    }

    if (params?.get('category') === label) {
      delete updatedQuery.category;
    }

    const url = qs.stringifyUrl({
      url: '/properties',
      query: updatedQuery
    }, { skipNull: true });

    router.push(url, { scroll: false });
  }, [label, router, params]);

  return ( 
    <div
      onClick={handleClick}
      className={`
        flex 
        items-center 
        justify-center 
        gap-2
        p-3
        border-2
        rounded-full
        hover:text-neutral-800
        transition
        cursor-pointer
        ${selected 
          ? 'border-neutral-800 text-neutral-800 rounded-full' 
          : 'border-transparent text-neutral-500'}
      `}
    >
      <Icon size={24} />
      <div className="font-medium text-sm">
        {label}
      </div>
    </div>
   );
}
 
export default CategoryBox;
