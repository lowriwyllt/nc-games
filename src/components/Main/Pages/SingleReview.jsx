import * as api from "../../../api";
import { useContext, useEffect, useState } from "react";
import Header from "../Elements/General/Header";
import ReviewCard from "../Elements/Reviews/ReviewCard";
import { Link, useParams } from "react-router-dom";
import PixelLoader from "../Elements/General/PixelLoader";
import { ActiveNavbarContext } from "../../../contexts/ActiveNavbar";

const SingleReview = ({
  isLoading,
  setIsLoading,
  currentUser,
  reviewQueries,
}) => {
  const { setActiveNavbar } = useContext(ActiveNavbarContext);
  const { reviewId } = useParams();
  const [review, setReview] = useState({});
  useEffect(() => {
    setIsLoading(true);
    api.fetchReview(reviewId).then((data) => {
      setReview(data);
      setIsLoading(false);
    });
  }, [reviewId]);

  const handleOnClick = () => {
    setActiveNavbar(false);
  };

  return (
    <main>
      <Header />
      <h2>Review</h2>
      {!reviewQueries.category ? (
        <p onClick={handleOnClick}>
          <Link className="green" to="/reviews">
            Back to category
          </Link>
        </p>
      ) : (
        <p onClick={handleOnClick}>
          <Link
            className="green"
            to={`/categories/${reviewQueries.category}/reviews`}
          >
            Back to category
          </Link>
        </p>
      )}

      {isLoading ? (
        <PixelLoader loadingMessage={"Loading..."} />
      ) : (
        <div className="singleReview">
          <ReviewCard
            review={review}
            space={"single"}
            currentUser={currentUser}
          />
        </div>
      )}
    </main>
  );
};

export default SingleReview;
