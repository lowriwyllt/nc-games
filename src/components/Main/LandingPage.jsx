import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ActiveNavbarContext } from "../../contexts/ActiveNavbar";
import Title from "./Title";

const LandingPage = () => {
  //Props and context
  const { setActiveNavbar } = useContext(ActiveNavbarContext);
  const [continueValue, setContinueValue] = useState("");

  //handles when someone types in "y" or "n"
  let navigate = useNavigate();
  const handleOnChange = (event) => {
    if (event.nativeEvent.data) {
      if (event.nativeEvent.data.toLowerCase() === "y") {
        setContinueValue("... yes");
        setTimeout(() => {
          navigate("/reviews");
        }, 750);
        setActiveNavbar(false);
      } else if (event.nativeEvent.data.toLowerCase() === "n") {
        setContinueValue("... no");
        setTimeout(() => {
          navigate("/noEntry");
        }, 750);
        setActiveNavbar(false);
      }
    }
  };

  return (
    <main className="centerGame">
      <Title setActiveNavbar={setActiveNavbar} />
      <form id="gameLandingForm">
        <label htmlFor="continue">
          Welcome to NC Games​ <br /> Would you like to continue to the rest of
          the site? Y/n​
        </label>
        <br />
        <input
          id="continue"
          name="continue"
          onChange={handleOnChange}
          value={continueValue}
          autoFocus
        />
      </form>
    </main>
  );
};

export default LandingPage;
