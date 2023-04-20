import { Link } from "react-router-dom";

const LoginLink = ({ setActiveNavbar }) => {
  return (
    <Link id="login_link" to="/account">
      <p onClick={() => setActiveNavbar(false)}>Login</p>
      <img
        src={window.location.origin + "/images/login_icon.png"}
        alt="log in icon"
        className="icon"
        onClick={() => setActiveNavbar(false)}
      />
    </Link>
  );
};

export default LoginLink;
