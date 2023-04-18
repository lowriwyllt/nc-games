import * as api from "../../../api";
import { useEffect, useState } from "react";
import Header from "../Elements/General/Header";
import ReviewCard from "../Elements/Reviews/ReviewCard";
import { Link, useParams } from "react-router-dom";

const SingleReview = ({
  setActiveNavbar,
  isLoading,
  setIsLoading,
  currentUser,
}) => {
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
      <Header setActiveNavbar={setActiveNavbar} />
      <h2>Review</h2>
      <p onClick={handleOnClick}>
        <Link className="green" to="/reviews">
          Back to all reviews
        </Link>
      </p>
      {isLoading ? (
        <p>Loading...</p>
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
