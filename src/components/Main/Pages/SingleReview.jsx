import * as api from "../../../api";
import { useEffect, useState } from "react";
import Header from "./Header";
import ReviewCard from "./ReviewCard";
import { Link, useParams } from "react-router-dom";

const SingleReview = ({ setActiveNavbar }) => {
  const { reviewId } = useParams();
  const [review, setReview] = useState({});
  useEffect(() => {
    api.fetchReview(reviewId).then((data) => {
      setReview(data);
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
      <div className="singleReview">
        <ReviewCard review={review} space={"single"} />
      </div>
    </main>
  );
};

export default SingleReview;
