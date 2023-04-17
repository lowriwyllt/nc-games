import { Link } from "react-router-dom";

const Title = ({ setActiveNavbar }) => {
  const handleOnClick = () => {
    setActiveNavbar(false);
  };
  return (
    <Link to="/">
      <h1 onClick={handleOnClick}>NC Games</h1>
    </Link>
  );
};

export default Title;
