import { useState } from "react";
import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./components/Main/LandingPage";
import NoEntry from "./components/Main/NoEntry";
import Reviews from "./components/Main/Pages/Reviews";
import SingleReview from "./components/Main/Pages/SingleReview";

function App() {
  const [activeNavbar, setActiveNavbar] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState("tickle122"); //This is hardcoded for now

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
        <Route
          path="/reviews"
          element={
            <Reviews
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              setActiveNavbar={setActiveNavbar}
              categories={categories}
              setCategories={setCategories}
              currentUser={currentUser}
            />
          }
        />
        <Route
          path="/reviews/:reviewId"
          element={
            <SingleReview
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              setActiveNavbar={setActiveNavbar}
              currentUser={currentUser}
            />
          }
        />
        <Route
          path="/categories/:category_slug/reviews"
          element={
            <Reviews
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              setActiveNavbar={setActiveNavbar}
              categories={categories}
              setCategories={setCategories}
              currentUser={currentUser}
            />
          }
        />
      </Routes>
      <Navbar activeNavbar={activeNavbar} setActiveNavbar={setActiveNavbar} />
      <Footer />
    </div>
  );
}

export default App;
