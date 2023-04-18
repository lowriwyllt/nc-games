import { Link } from "react-router-dom";
import Title from "./Title";

const NoEntry = ({ setActiveNavbar }) => {
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
