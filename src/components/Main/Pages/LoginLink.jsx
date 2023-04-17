import { Link } from "react-router-dom";

const LoginLink = ({ setActiveNavbar }) => {
  const handleOnClick = () => {
    setActiveNavbar(false);
  };
  return (
    <Link id="login_link">
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
