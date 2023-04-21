import { useContext } from "react";
import { CurrentUserContext } from "../../../../contexts/CurrentUser";

const UserCard = ({ user }) => {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const handleOnClickSignIn = () => {
    setCurrentUser(user);
  };
  const handleOnClickSignOut = () => {
    setCurrentUser({});
  };
  return (
    <div className="account">
      <img className="UserAvatarAccount" src={user.avatar_url} />
      <p>
        <b>{user.name}</b>
      </p>
      <p>{user.username}</p>
      {currentUser.username ? (
        <button onClick={handleOnClickSignOut}>Sign out</button>
      ) : (
        <button onClick={handleOnClickSignIn}>Sign In</button>
      )}
    </div>
  );
};

export default UserCard;
