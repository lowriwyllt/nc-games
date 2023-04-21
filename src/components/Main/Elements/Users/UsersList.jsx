import { useContext, useEffect, useState } from "react";
import * as api from "../../../../api";

import UserCard from "./UserCard";
import { CurrentUserContext } from "../../../../contexts/CurrentUser";

const UsersList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.fetchUsers().then((users) => {
      setUsers(users);
    });
  }, []);

  return (
    <div className="userList">
      {users.map((user) => (
        <UserCard user={user} />
      ))}
    </div>
  );
};

export default UsersList;
