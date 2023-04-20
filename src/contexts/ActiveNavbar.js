import { createContext, useState } from "react";

export const ActiveNavbarContext = createContext();

export const ActiveNavbarProvider = ({ children }) => {
  const [activeNavbar, setActiveNavbar] = useState(false);

  return (
    <ActiveNavbarContext.Provider value={{ activeNavbar, setActiveNavbar }}>
      {children}
    </ActiveNavbarContext.Provider>
  );
};
