"use client";
import React from "react";
import {
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
} from "@nextui-org/react";

// Example data fetching function (replace with actual data fetching logic)
const fetchHistory = () => [
  "New York",
  "Los Angeles",
  "Chicago",
  "Houston",
  "Phoenix",
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [history, setHistory] = React.useState(fetchHistory());

  const handleDeleteItem = (item) => {
    setHistory((prevHistory) => prevHistory.filter((i) => i !== item));
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      <NavbarMenu className="z-[99999999999999999999] top-40 md:w-[20%] w-full overflow-scroll">
        {history.length > 0 ? (
          history.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <div className="flex justify-between items-center w-full">
                <span>{item}</span>
                <Button
                  auto
                  light
                  size="sm"
                  color="error"
                  onClick={() => handleDeleteItem(item)}
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
        {history.length > 0 && (
          <NavbarMenuItem>
            <Button auto flat color="warning" onClick={handleClearHistory}>
              Clear All History
            </Button>
          </NavbarMenuItem>
        )}
      </NavbarMenu>
    </Navbar>
  );
}
