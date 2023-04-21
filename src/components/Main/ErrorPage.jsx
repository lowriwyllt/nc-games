import { useContext } from "react";
import { Link } from "react-router-dom";
import { ActiveNavbarContext } from "../../contexts/ActiveNavbar";
import Title from "./Title";

const ErrorPage = ({ errMsg, errCode }) => {
  //Props and context
  const { setActiveNavbar } = useContext(ActiveNavbarContext);

  let errorNotice = "";
  if (errCode === 404) {
    errorNotice = "Page not Found";
  } else if (errCode === 400) {
    errorNotice = "Bad Request";
  }

  return (
    <main className="centerGame">
      <Title setActiveNavbar={setActiveNavbar} />
      <h2>
        {errCode} {errorNotice}
      </h2>
      <p>Error </p>
      {errMsg ? <p>{errMsg}</p> : null}
      <Link to="/" className="green">
        To the Landing Page
      </Link>
    </main>
  );
};

export default ErrorPage;
