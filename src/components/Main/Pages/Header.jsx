import Title from "../Title";
import LoginLink from "./LoginLink";

const Header = ({ setActiveNavbar }) => {
  return (
    <header>
      <Title setActiveNavbar={setActiveNavbar} />
      <LoginLink setActiveNavbar={setActiveNavbar} />
    </header>
  );
};

export default Header;
