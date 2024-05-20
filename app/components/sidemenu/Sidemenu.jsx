"use client";
import React, { useState, useEffect } from "react";
import db from "@/app/firebase";
import { onSnapshot, collection, doc, deleteDoc } from "firebase/firestore";
import {
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
} from "@nextui-org/react";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [locationData, setLocationData] = useState([{ name: "..." }]);

  console.log(locationData);

  //  GET
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "location"), (snapshot) => {
      setLocationData(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });

    return () => unsubscribe();
  }, []);

  //  DELETE
  const handleDeleteItem = async (id) => {
    await deleteDoc(doc(db, "location", id));
    setLocationData((prevData) => prevData.filter((item) => item.id !== id));
  };

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      isBlurred={false}
      className="bg-transparent"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      <NavbarMenu className="z-[99999999999999999999] top-44 md:w-96 w-full overflow-scroll">
        <h1 className="font-medium text-xl">Recent History</h1>
        {locationData.length > 0 ? (
          locationData.map((locationDataItem) => (
            <NavbarMenuItem key={locationDataItem.id}>
              <div className="flex justify-between items-center w-full">
                <span>{locationDataItem.address}</span>
                <Button
                  auto
                  light
                  size="md"
                  className="text-red-500"
                  onClick={() => handleDeleteItem(locationDataItem.id)}
                >
                  Delete
                </Button>
              </div>
            </NavbarMenuItem>
          ))
        ) : (
          <NavbarMenuItem>
            <span>No search history found.</span>
          </NavbarMenuItem>
        )}
      </NavbarMenu>
    </Navbar>
  );
}
