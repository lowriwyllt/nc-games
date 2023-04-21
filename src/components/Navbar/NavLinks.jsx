import { useContext } from "react";
import { Link } from "react-router-dom";
import { ActiveNavbarContext } from "../../contexts/ActiveNavbar";

function NavLinks() {
  const { activeNavbar, setActiveNavbar } = useContext(ActiveNavbarContext);

  const handleOnClick = () => {
    setActiveNavbar(false);
  };

  return (
    <div
      className={
        activeNavbar
          ? "Navbar__links Navbar__links__ToggleShow"
          : "Navbar__links"
      }
    >
      <Link to="/" className="Navbar__Link">
        <p onClick={handleOnClick}>Home</p>
      </Link>
      <Link to="/reviews" className="Navbar__Link">
        <p onClick={handleOnClick}>Reviews</p>
      </Link>
      <Link to="/account" className="Navbar__Link">
        <p onClick={handleOnClick}>Account</p>
      </Link>
    </div>
  );
}

export default NavLinks;
