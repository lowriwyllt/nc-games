import { useContext } from "react";

import UserCard from "./UserCard";
import { AllUsersContext } from "../../../../contexts/AllUsers";

const UsersList = () => {
  const { allUsers } = useContext(AllUsersContext);

  return (
    <div className="userList">
      {allUsers.map((user) => (
        <UserCard key={user.username} user={user} />
      ))}
    </div>
  );
};

export default UsersList;
