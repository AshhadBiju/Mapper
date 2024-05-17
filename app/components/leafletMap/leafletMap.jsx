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
import React, { useState, useRef, useMemo, useCallback } from "react";
import { Input } from "@nextui-org/react";
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
    lat: 51.505,
    lng: -0.09,
  };

  const [position, setPosition] = useState(center);

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
        console.log(e.latlng);
      },
    });
    return null;
  }

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
