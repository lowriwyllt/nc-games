import { useContext } from "react";
import Header from "../Elements/General/Header";
import { CurrentUserContext } from "../../../contexts/CurrentUser";
import UsersList from "../Elements/Users/UsersList";
import UserCard from "../Elements/Users/UserCard";

const Account = () => {
  const { currentUser } = useContext(CurrentUserContext);

  if (currentUser.username) {
    return (
      <main>
        <Header />
        <h2>My Account</h2>
        <UserCard user={currentUser} />
      </main>
    );
  } else {
    return (
      <main>
        <Header />
        <h2>Users</h2>
        <UsersList />
      </main>
    );
  }
};

export default Account;
