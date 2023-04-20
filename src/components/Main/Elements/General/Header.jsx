import { useContext } from "react";
import Title from "../../Title";
import LoginLink from "./LoginLink";
import { ActiveNavbarContext } from "../../../../contexts/ActiveNavbar";

const Header = () => {
  const { setActiveNavbar } = useContext(ActiveNavbarContext);
  return (
    <header>
      <Title setActiveNavbar={setActiveNavbar} />
      <LoginLink setActiveNavbar={setActiveNavbar} />
    </header>
  );
};

export default Header;
