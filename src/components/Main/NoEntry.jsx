import { Link } from "react-router-dom";
import { useContext } from "react";
import { ActiveNavbarContext } from "../../contexts/ActiveNavbar";

const NoEntry = () => {
  const { setActiveNavbar } = useContext(ActiveNavbarContext);

  return (
    <main className="centerGame">
      <h1>NC Games</h1>
      <p>{"You decided not to enter :("}</p>
      <p onClick={() => setActiveNavbar(false)}>
        <Link className="green" to="/">
          Back to Landing Page...
        </Link>
      </p>
    </main>
  );
};

export default NoEntry;
