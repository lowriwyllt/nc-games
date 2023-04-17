import { useState } from "react";
import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./components/Main/LandingPage";
import NoEntry from "./components/Main/NoEntry";

function App() {
  const [activeNavbar, setActiveNavbar] = useState(false);
  let appClass = "App";
  if (activeNavbar) {
    appClass += " AppNav";
  }
  return (
    <div className={appClass}>
      <Routes>
        <Route
          path="/"
          element={<LandingPage setActiveNavbar={setActiveNavbar} />}
        />
        <Route
          path="/noEntry"
          element={<NoEntry setActiveNavbar={setActiveNavbar} />}
        />
      </Routes>
      <Navbar activeNavbar={activeNavbar} setActiveNavbar={setActiveNavbar} />
      <Footer />
    </div>
  );
}

export default App;
