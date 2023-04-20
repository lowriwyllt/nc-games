import { useContext } from "react";
import MenuButton from "./MenuButton";
import NavLinks from "./NavLinks";
import { ActiveNavbarContext } from "../../contexts/ActiveNavbar";

function Navbar() {
  const { activeNavbar } = useContext(ActiveNavbarContext);

  return (
    <div className={activeNavbar ? "Navbar Navbar__ToggleShow" : "Navbar"}>
      <MenuButton />
      <nav className="Navbar__Items">
        <NavLinks className="navLinks" />
      </nav>
    </div>
  );
}

export default Navbar;
