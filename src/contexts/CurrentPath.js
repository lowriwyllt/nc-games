import { createContext, useState } from "react";

export const CurrentPathContext = createContext();

export const CurrentPathProvider = ({ children }) => {
  const [currentPath, setCurrentPath] = useState({});

  return (
    <CurrentPathContext.Provider value={{ currentPath, setCurrentPath }}>
      {children}
    </CurrentPathContext.Provider>
  );
};
