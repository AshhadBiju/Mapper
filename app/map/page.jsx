"use client";
import dynamic from "next/dynamic";
import { Input } from "@nextui-org/react";
import Image from "next/image";
import { mapSearch } from "@/public/images/map-search.svg";
import mapBg from "@/public/images/map-bg.svg";
const DynamicMap = dynamic(
  () => import("@/app/components/leafletMap/leafletMap"),
  {
    ssr: false,
  }
);

export default function Map() {
  return (
    <main className="h-full flex md:flex-row flex-col gap-x-4 gap-y-4 ">
      {/* <div className="md:w-[20%] w-[100%] p-4 bg-slate-200 rounded-2xl">
        <div className="mb-4">
 
          <Input
            classNames={{
              base: "min-w-full sm:max-w-[10rem] h-10",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper:
                "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
            }}
            placeholder="Press Enter to Search"
            size="sm"
       
            type="search"
          />
        </div>
        <div className="mb-4">
  
          <h2 className="text-lg font-semibold mb-2 ">Places you've mapped</h2>
          <ul className="list-disc pl-4 ">
            <li>Previous Search 1</li>
            <li>Previous Search 2</li>
            <li>Previous Search 3</li>
  
          </ul>
        </div>
  
      </div> */}

      {/* <div className="md:w-[80%] w-[100%]"> */}
      <div className="w-full">
        <DynamicMap />
        <div className="z-[999999] absolute top-1 left-16 min-w-64">
          <div className="flex items-center">
            <div className="text-2xl font-normal">Mapper</div>
            <Image
              src={mapBg}
              alt="map goes here"
              width={50}
              sizes="(min-width: 500px) 254px, (min-width: 780px) 147px, 254px"
              priority={true}
            />
          </div>
          <div className="-mt-3">
            <Input
              classNames={{
                base: "min-w-full sm:max-w-[10rem] h-10",
                mainWrapper: "h-full",
                input: "text-small",
                inputWrapper: "h-full font-normal text-default-500 ",
              }}
              placeholder="Press Enter to Search"
              size="sm"
              type="search"
            />
          </div>
          <div className="bg-white h-full w-full mt-2 rounded-lg">
            <Image
              src={mapBg}
              alt="map goes here"
              width={80}
              sizes="(min-width: 500px) 254px, (min-width: 780px) 147px, 254px"
              priority={true}
            />
            <br /> Place: Name
          </div>
        </div>
      </div>
    </main>
  );
}
