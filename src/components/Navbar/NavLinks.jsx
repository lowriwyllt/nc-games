import { Link } from "react-router-dom";

function NavLinks({ activeNavbar, setActiveNavbar }) {
  let navLinkClass = "Navbar__links";
  if (activeNavbar) {
    navLinkClass += " Navbar__links__ToggleShow";
  }

  const handleOnClick = () => {
    setActiveNavbar(false);
  };

  return (
    <div className={navLinkClass}>
      <Link to="/" className="Navbar__Link">
        <p onClick={handleOnClick}>Home</p>
      </Link>
      <Link to="/reviews" className="Navbar__Link">
        <p onClick={handleOnClick}>Reviews</p>
      </Link>
    </div>
  );
}

export default NavLinks;
