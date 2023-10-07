'use client';

import qs from 'query-string';
import { useRouter} from "next/navigation";
import { useCallback, useRef } from "react";
import Image from "next/image";
import { trending } from "@app/constants";

interface TrendingBoxProps {
  item: {
    imgSrc: string; 
    alt: string; 
    title: string; 
  }
}

const TrendingBox = ({ item }: TrendingBoxProps) => {
  const router = useRouter();

  const handleClick = useCallback(() => {
    const location = item.title;

    const updatedQuery: any = {
      location,
    }

    const url = qs.stringifyUrl({
      url: '/properties',
      query: updatedQuery
    }, { skipNull: true });

    router.push(url);
}, [router]);

return (
  <div 
    onClick={handleClick}
    className="relative overflow-hidden rounded-xl aspect-square w-full"
  >
    <Image
      src={item.imgSrc}
      alt={item.alt}
      fill
      className="z-0 object-cover h-full w-full hover:scale-105 cursor-pointer"
    />
    <p className="absolute text-white top-5 text-2xl font-bold ml-5">
      {item.title}
    </p>
  </div>
)
}

const Trending = () => {
  return (
    <div className="flex max-md:flex-col max-md:items-center justify-between gap-5 max-xl:gap-2">
      {trending.map((item) => (
        <TrendingBox key={item.title} item={item} />
      ))}
    </div>
  )
};

export default Trending;
