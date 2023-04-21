import { useState, useContext } from "react";
import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./components/Main/LandingPage";
import NoEntry from "./components/Main/NoEntry";
import Reviews from "./components/Main/Pages/Reviews";
import SingleReview from "./components/Main/Pages/SingleReview";
import { ActiveNavbarContext } from "./contexts/ActiveNavbar";
import ErrorPage from "./components/Main/ErrorPage";

function App() {
  //Props and context
  const { activeNavbar, setActiveNavbar } = useContext(ActiveNavbarContext);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [reviewQueries, setReviewQueries] = useState({
    category: "",
    order: "desc",
    sortBy: "created_at",
  });

  return (
    <div className={activeNavbar ? "App AppNav" : "App"}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/noEntry" element={<NoEntry />} />
        <Route
          path="/reviews"
          element={
            <Reviews
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              categories={categories}
              setCategories={setCategories}
              queries={reviewQueries}
              setQueries={setReviewQueries}
            />
          }
        />
        <Route
          path="/reviews/:reviewId"
          element={
            <SingleReview
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              reviewQueries={reviewQueries}
            />
          }
        />
        <Route
          path="/categories/:category_slug/reviews"
          element={
            <Reviews
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              categories={categories}
              setCategories={setCategories}
              queries={reviewQueries}
              setQueries={setReviewQueries}
            />
          }
        />
        <Route
          path="*"
          element={<ErrorPage errCode={404} errMsg={"Page not found"} />}
        />
      </Routes>
      {/* On Every Page */}
      <Navbar />
      <Footer />
    </div>
  );
}

export default App;
