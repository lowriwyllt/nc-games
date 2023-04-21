import { useContext } from "react";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../../../contexts/CurrentUser";

const LoginLink = ({ setActiveNavbar }) => {
  const { currentUser } = useContext(CurrentUserContext);

  const handleOnClick = () => {
    setActiveNavbar(false);
  };

  if (currentUser.username) {
    return (
      <Link id="user_link" to="/account">
        <p id="UserName">
          <b>{currentUser.name}</b>
        </p>
        <p id="UserUserName">{currentUser.username}</p>
        <img
          id="UserAvatar"
          src={currentUser.avatar_url}
          alt={`${currentUser.username}'s Avatar`}
        />
      </Link>
    );
  } else {
    return (
      <Link id="login_link" to="/account">
        <p onClick={handleOnClick}>Login</p>
        <img
          src={window.location.origin + "/images/login_icon.png"}
          alt="log in icon"
          className="icon"
          onClick={handleOnClick}
        />
      </Link>
    );
  }
};

export default LoginLink;
