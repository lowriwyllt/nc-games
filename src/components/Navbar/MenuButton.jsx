import { useContext } from "react";
import { ActiveNavbarContext } from "../../contexts/ActiveNavbar";

function MenuButton() {
  const { activeNavbar, setActiveNavbar } = useContext(ActiveNavbarContext);
  const handleClick = () => {
    setActiveNavbar(!activeNavbar);
  };
  return (
    <div className="Navbar__Link Navbar__Link-toggle">
      <img
        className="icon"
        src={window.location.origin + "/images/menu_icon.png"}
        alt="menu icon"
        onClick={handleClick}
      />
    </div>
  );
}

export default MenuButton;
