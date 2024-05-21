"use client";
import db from "@/app/firebase";
import { onSnapshot, collection, addDoc } from "firebase/firestore";
import axios from "axios";
import Image from "next/image";
import React, {
  useState,
  useRef,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import L from "leaflet";
import {
  MapContainer,
  TileLayer,
  Popup,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Input } from "@nextui-org/react";
import mapBg from "@/public/images/map-bg.svg";
import Sidemenu from "@/app/components/sidemenu/Sidemenu";
import mapMarker from "@/public/images/map-marker.svg";
// import mapAPIKey from "@/app/utils/mapApiKey";

export default function Map() {
  const initialCenter = {
    lat: 11.0662,
    lng: 76.074,
  };

  const [position, setPosition] = useState(initialCenter);
  const [addressData, setAddressData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const mapAPIKey = process.env.NEXT_PUBLIC_BING_MAPS_API_KEY;

  // const customIcon = L.icon({
  //   iconUrl: markerIconPng,
  //   shadowUrl: markerShadowPng,
  //   iconSize: [25, 41],
  //   iconAnchor: [12, 41],
  //   popupAnchor: [1, -34],
  //   shadowSize: [41, 41],
  // });

  function DraggableMarker({ position, setPosition }) {
    const [draggable, setDraggable] = useState(false);
    const markerRef = useRef(null);
    const map = useMap();
    const eventHandlers = useMemo(
      () => ({
        dragend() {
          const marker = markerRef.current;
          if (marker != null) {
            const newPos = marker.getLatLng();
            setPosition(newPos);
            map.setView(newPos);
          }
        },
      }),
      [setPosition, map]
    );

    const toggleDraggable = useCallback(() => {
      setDraggable((d) => !d);
    }, []);

    return (
      <Marker
        icon={L.divIcon({
          html: `<img src=${mapMarker.src} alt="marker" />`,
        })}
        draggable={true}
        eventHandlers={eventHandlers}
        position={position}
        ref={markerRef}
      >
        <Popup minWidth={90}>
          <span onClick={toggleDraggable}>{draggable}</span>
        </Popup>
      </Marker>
    );
  }

  function LocationLogger() {
    const map = useMapEvents({
      click: (e) => {
        setPosition(e.latlng);
        map.setView(e.latlng);
      },
    });
    return null;
  }

  useEffect(() => {
    // console.log("Marker position: ", position);
  }, [position]);

  const fetchLocationData = async (lat, lng) => {
    const url = `https://dev.virtualearth.net/REST/v1/Locations/${lat},${lng}?key=${mapAPIKey}`;
    try {
      const response = await axios.get(url);
      const address = response.data.resourceSets[0].resources[0].address;
      setAddressData(address);
      // console.log("State:", address.adminDistrict);
      // console.log("District:", address.adminDistrict2);
      // console.log("Country:", address.countryRegion);
      // console.log("Location:", address.formattedAddress);
      // console.log("Postal code:", address.postalCode);
    } catch (error) {
      console.error("Error fetching location data:", error);
    }
  };

  useEffect(() => {
    if (position) {
      fetchLocationData(position.lat, position.lng);
    }
  }, [position]);

  const fetchLocationByQuery = async (query) => {
    const url = `https://dev.virtualearth.net/REST/v1/Locations/${encodeURIComponent(
      query
    )}?key=${mapAPIKey}`;
    try {
      const response = await axios.get(url);
      const resources = response.data.resourceSets[0].resources;
      if (resources.length > 0) {
        const location = resources[0].point.coordinates;
        const newLatLng = { lat: location[0], lng: location[1] };
        setPosition(newLatLng);

        // ADD
        await addDoc(collection(db, "location"), {
          address: query,
          lat: location[0],
          lng: location[1],
        });
      } else {
        console.error("No location found for the query:", query);
      }
    } catch (error) {
      console.error("Error fetching location by query:", error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchLocationByQuery(searchQuery);
  };

  return (
    <div>
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={false}
        className="min-h-screen w-full overflow-hidden"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <DraggableMarker position={position} setPosition={setPosition} />
        <LocationLogger />
      </MapContainer>
      <div className="z-[999] absolute top-1 left-16 w-80">
        <div className="flex items-center">
          <div className="text-2xl ">Mapper</div>
          <Image
            src={mapBg}
            alt="map goes here"
            width={50}
            sizes="(min-width: 500px) 254px, (min-width: 780px) 147px, 254px"
            priority={true}
          />
        </div>
        <form onSubmit={handleSearch} className="-mt-3 flex flex-col gap-2">
          <div>
            <Input
              classNames={{
                base: "min-w-full sm:max-w-[10rem] h-10",
                mainWrapper: "h-full",
                input: "text-small",
                inputWrapper: "h-full font-normal text-default-500",
              }}
              placeholder="Press Enter to Map away"
              size="sm"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex">
            <div className="bg-white h-full w-full rounded-lg p-4">
              {addressData && (
                <div className="text-sm">
                  <p>{addressData.formattedAddress}</p>
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
      <div className="absolute z-[99999999999999] top-20 bg-transparent rounded-2xl p-0">
        <Sidemenu />
      </div>
    </div>
  );
}
