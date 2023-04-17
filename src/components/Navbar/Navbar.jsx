import { useState } from "react";
import MenuButton from "./MenuButton";
import NavLinks from "./NavLinks";

function Navbar({ activeNavbar, setActiveNavbar }) {
  let navClass = "Navbar";
  if (activeNavbar) {
    navClass += " Navbar__ToggleShow";
  }

  return (
    <div className={navClass}>
      <MenuButton
        activeNavbar={activeNavbar}
        setActiveNavbar={setActiveNavbar}
      />
      <nav className="Navbar__Items">
        <NavLinks
          className="navLinks"
          activeNavbar={activeNavbar}
          setActiveNavbar={setActiveNavbar}
        />
      </nav>
    </div>
  );
}

export default Navbar;
