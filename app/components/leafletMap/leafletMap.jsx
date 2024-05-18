// "use client";
// import React from "react";
// import React, { useState, useRef, useMemo, useCallback } from "react";
// import L from "leaflet";
// import {
//   MapContainer,
//   TileLayer,
//   Popup,
//   Marker,
//   SVGOverlay,
// } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import markerIconUrl from "@/../node_modules/leaflet/src/images/marker.svg";
// import markerShadowUrl from "@/../node_modules/leaflet/src/images/layers.svg";

// export default function Map() {
//   const center = {
//     lat: 51.505,
//     lng: -0.09,
//   };

//   function DraggableMarker() {
//     const [draggable, setDraggable] = useState(false);
//     const [position, setPosition] = useState(center);
//     const markerRef = useRef(null);
//     const eventHandlers = useMemo(
//       () => ({
//         dragend() {
//           const marker = markerRef.current;
//           if (marker != null) {
//             setPosition(marker.getLatLng());
//           }
//         },
//       }),
//       []
//     );
//     const toggleDraggable = useCallback(() => {
//       setDraggable((d) => !d);
//     }, []);

//     return (
//       <Marker
//         draggable={draggable}
//         eventHandlers={eventHandlers}
//         position={position}
//         ref={markerRef}
//       >
//         <Popup minWidth={90}>
//           <span onClick={toggleDraggable}>
//             {draggable
//               ? "Marker is draggable"
//               : "Click here to make marker draggable"}
//           </span>
//         </Popup>
//       </Marker>
//     );
//   }
//   return (
//     <div>
//       <MapContainer
//         onClick={(e) => {
//           console.log(e);
//         }}
//         center={center}
//         zoom={13}
//         scrollWheelZoom={false}
//         className="min-h-screen w-full overflow-hidden"
//       >
//         <TileLayer
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />
//         <DraggableMarker />
//       </MapContainer>
//     </div>
//   );
// }
"use client";
import axios from "axios";
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
    </div>
  );
}

// "use client";
// import React, { useState, useRef, useMemo, useCallback } from "react";
// import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import { SearchControl, OpenStreetMapProvider, Search } from "react-leaflet-search";
// import markerIconUrl from "@/../node_modules/leaflet/src/images/marker.svg";
// import markerShadowUrl from "@/../node_modules/leaflet/src/images/layers.svg";

// export default function Map() {
//   const center = {
//     lat: 51.505,
//     lng: -0.09,
//   };

//   function DraggableMarker() {
//     const [draggable, setDraggable] = useState(false);
//     const [position, setPosition] = useState(center);
//     const markerRef = useRef(null);
//     const eventHandlers = useMemo(
//       () => ({
//         dragend() {
//           const marker = markerRef.current;
//           if (marker != null) {
//             setPosition(marker.getLatLng());
//           }
//         },
//       }),
//       []
//     );
//     const toggleDraggable = useCallback(() => {
//       setDraggable((d) => !d);
//     }, []);

//     return (
//       <Marker
//         draggable={draggable}
//         eventHandlers={eventHandlers}
//         position={position}
//         ref={markerRef}
//       >
//         <Popup minWidth={90}>
//           <span onClick={toggleDraggable}>
//             {draggable
//               ? "Marker is draggable"
//               : "Click here to make marker draggable"}
//           </span>
//         </Popup>
//       </Marker>
//     );
//   }

//   return (
//     <div>
//       <MapContainer
//         center={center}
//         zoom={13}
//         scrollWheelZoom={false}
//         className="min-h-screen w-full overflow-hidden"
//       >
//         <TileLayer
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />
//         <SearchControl
//           provider={new OpenStreetMapProvider()}
//           showMarker={true}
//           showPopup={false}
//           popUp={this.customPopup}
//           autoClose={true}
//           search={false}
//         />
//         <DraggableMarker />
//       </MapContainer>
//     </div>
//   );
// }
