import { createContext, useEffect, useState } from "react";
import * as api from "../api";

export const AllUsersContext = createContext();

export const AllUsersProvider = ({ children }) => {
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    api.fetchUsers().then((users) => {
      setAllUsers(users);
    });
  }, []);

  return (
    <AllUsersContext.Provider value={{ allUsers, setAllUsers }}>
      {children}
    </AllUsersContext.Provider>
  );
};
