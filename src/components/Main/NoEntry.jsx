import { Link } from "react-router-dom";
import Title from "./Title";
import { useContext } from "react";
import { ActiveNavbarContext } from "../../contexts/ActiveNavbar";

const NoEntry = () => {
  const { setActiveNavbar } = useContext(ActiveNavbarContext);

  const handleOnClick = () => {
    setActiveNavbar(false);
  };
  return (
    <main className="centerGame">
      <Title setActiveNavbar={setActiveNavbar} />
      <p>{"You decided not to enter :("}</p>
      <p onClick={handleOnClick}>
        <Link className="green" to="/">
          Back to Landing Page...
        </Link>
      </p>
    </main>
  );
};

export default NoEntry;
