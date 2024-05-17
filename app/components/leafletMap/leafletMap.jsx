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
import markerIconUrl from "@/../node_modules/leaflet/src/images/marker.svg";
import markerShadowUrl from "@/../node_modules/leaflet/src/images/layers.svg";

export default function Map() {
  const center = {
    lat: 51.505,
    lng: -0.09,
  };

  function DraggableMarker() {
    const [draggable, setDraggable] = useState(false);
    const [position, setPosition] = useState(center);
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
      []
    );
    const toggleDraggable = useCallback(() => {
      setDraggable((d) => !d);
    }, []);

    return (
      <Marker
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
        <DraggableMarker />
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
