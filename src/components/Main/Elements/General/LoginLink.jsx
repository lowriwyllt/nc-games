// import { useContext } from "react";
import { Link } from "react-router-dom";
// import { CurrentUserContext } from "../../../../contexts/CurrentUser";

const LoginLink = ({ setActiveNavbar }) => {
  // const { setCurrentUser } = useContext(CurrentUserContext);

  const handleOnClick = () => {
    setActiveNavbar(false);
  };

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
};

export default LoginLink;
