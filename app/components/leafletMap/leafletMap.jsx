"use client";
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
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Input } from "@nextui-org/react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
} from "@nextui-org/react";
import mapBg from "@/public/images/map-bg.svg";
import SideHistoryMenu from "@/public/icons/side-history-menu.svg";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";

export default function Map() {
  const center = {
    lat: 11.0662,
    lng: 76.074,
  };

  const [position, setPosition] = useState(center);
  const [addressData, setAddressData] = useState(null);
  const mapAPIKey =
    "AjtQMRI3xE0Q1glfO2sZBvmI8aCD8-P-O2KNe4tCPEJQVthOR6_M7dVL4LAna9qL";

  const customIcon = L.icon({
    iconUrl: markerIconPng,
    shadowUrl: markerShadowPng,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  function DraggableMarker({ position, setPosition }) {
    const [draggable, setDraggable] = useState(false);
    const markerRef = useRef(null);
    const eventHandlers = useMemo(
      () => ({
        dragend() {
          const marker = markerRef.current;
          console.log("MARKERREF : ", markerRef);
          if (marker != null) {
            setPosition(marker.getLatLng());
          }
        },
      }),
      [setPosition]
    );

    const toggleDraggable = useCallback(() => {
      setDraggable((d) => !d);
    }, []);

    return (
      <Marker
        icon={customIcon}
        draggable={draggable}
        eventHandlers={eventHandlers}
        position={position}
        ref={markerRef}
      >
        <Popup minWidth={90}>
          <span onClick={toggleDraggable}>
            {draggable
              ? "Marker is draggable"
              : "Click here to make marker draggable"}
          </span>
        </Popup>
      </Marker>
    );
  }

  function LocationLogger() {
    useMapEvents({
      click: (e) => {
        setPosition(e.latlng);
        // console.log(e.latlng);
      },
    });
    return null;
  }
  useEffect(() => {
    console.log("Marker position: ", position);
  }, [position]);

  const fetchLocationData = async (lat, lng) => {
    const url = `http://dev.virtualearth.net/REST/v1/Locations/${lat},${lng}?key=${mapAPIKey}`;
    try {
      const response = await axios.get(url);
      // const address = response.data.resourceSets[0].resources[0].address;
      // setAddressData(address);
      const address = response.data.resourceSets[0].resources[0].address;
      setAddressData(address);
      console.log("State:", address.adminDistrict);
      console.log("District:", address.adminDistrict2);
      console.log("Country:", address.countryRegion);
      console.log("Location:", address.formattedAddress);
      console.log("Postal code:", address.postalCode);
    } catch (error) {
      console.error("Error fetching location data:", error);
    }
  };

  useEffect(() => {
    if (position) {
      fetchLocationData(position.lat, position.lng);
    }
  }, [position]);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];
  return (
    <div>
      <MapContainer
        center={center}
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
        <div className="-mt-3 flex flex-col gap-2">
          <div className="">
            <Input
              classNames={{
                base: "min-w-full sm:max-w-[10rem] h-10",
                mainWrapper: "h-full",
                input: "text-small",
                inputWrapper: "h-full font-normal text-default-500",
              }}
              placeholder="Map your way"
              size="sm"
              type="search"
            />
          </div>
          <div className="flex">
            <div className="bg-white h-full w-full rounded-lg p-4">
              {addressData && (
                <div className="text-sm">
                  <p>{addressData.formattedAddress}</p>
                  {/* <p>{addressData.adminDistrict}</p>
                <p>{addressData.adminDistrict2}</p> */}
                  {/* <p>{addressData.countryRegion}</p> */}
                </div>
              )}
            </div>
          </div>
          {/* <div>
            <Image
              src={SideHistoryMenu}
              alt="map goes here"
              width={50}
              sizes="(min-width: 500px) 254px, (min-width: 780px) 147px, 254px"
              priority={true}
              className="absolute -left-16 top-24"
            />
          </div> */}
        </div>
      </div>
    </div>
  );
}
