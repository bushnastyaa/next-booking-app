'use client';

import qs from 'query-string';
import { useRouter} from "next/navigation";
import { useCallback, useRef } from "react";
import Image from "next/image";
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'
import { types } from "@app/constants";

interface TypesBoxProps {
  item: {
    imgSrc: string; 
    alt: string; 
    title: string; 
    desc: string;
  }
}

const TypesBox = ({ item }: TypesBoxProps) => {
  const router = useRouter();

  const handleClick = useCallback(() => {
    const label = item.title;

    const updatedQuery: any = {
      category: label,
    }

    const url = qs.stringifyUrl({
      url: '/properties',
      query: updatedQuery
    }, { skipNull: true });

    router.push(url);
  }, [router]);

  return (
    <div className="flex flex-col" onClick={handleClick}>
      <div key={item.title} className="relative overflow-hidden rounded-xl 
      aspect-square h-[230px] w-[275px]">
        <Image
          src={item.imgSrc}
          alt={item.alt}
          fill
          className="z-0 object-cover h-full w-full cursor-pointer hover:scale-105"
        />
      </div>
      <p className="font-bold mt-1">{item.title}</p>
      <p className="text-sm text-gray-500">{item.desc}</p>
    </div>
  )
}

const Types = () => {
  const sliderRef = useRef(null);

  const slideLeft = () => {
    // @ts-ignore
    sliderRef.current.scrollLeft -= 500;
  };
  const slideRight = () => {
     // @ts-ignore
    sliderRef.current.scrollLeft += 500;
  };

  return (
    <div className="relative">
      <div 
        onClick={slideLeft}
        className="absolute -left-4 top-1/3 p-2 cursor-pointer
      bg-white shadow-md rounded-full z-10 hover:bg-gray-100"
      >
        <BiChevronLeft className='z-10 hover:opacity-100' size={24} />
      </div>

      <div ref={sliderRef} className="flex gap-5 overflow-x-scroll scroll 
      whitespace-nowrap scroll-smooth scrollbar-hide">
        {types.map((item) => (
          <TypesBox  key={item.title} item={item} />
        ))}
      </div>

      <div 
        onClick={slideRight} 
        className="absolute -right-4 top-1/3 p-2 cursor-pointer
      bg-white shadow-md rounded-full hover:bg-gray-100"
      >
        <BiChevronRight className='hover:opacity-100' size={24} />
      </div>
    </div>
  )
}

export default Types;
