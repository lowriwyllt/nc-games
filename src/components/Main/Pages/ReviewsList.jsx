import * as api from "../../../api";
import { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";
import { useNavigate } from "react-router-dom";

const ReviewsList = ({
  categories,
  setCategories,
  isLoading,
  setIsLoading,
  setQueries,
  queries,
}) => {
  const [reviews, setReviews] = useState([]);
  const reviewsGreenList = [
    "created_at",
    "review_id",
    "title",
    "category",
    "designer",
    "owner",
    "review_body",
    "review_img_url",
    "votes",
  ];

  useEffect(() => {
    api
      .fetchCategories()
      .then((data) => {
        setCategories(data);
      })
      .then(() => {
        api
          .fetchReviews(
            queries.category,
            queries.sortBy,
            queries.order,
            queries.limit,
            queries.page
          )
          .then((data) => {
            setReviews(data);
            setIsLoading(false);
          });
      });
  }, [queries]);

  let navigate = useNavigate();
  const categoryHandleChange = (event) => {
    if (event.target.value === "") {
      navigate("/reviews");
    } else {
      navigate(`/categories/${event.target.value}/reviews`);
    }
  };

  const sortbyHandleChange = (event) => {
    setQueries({ ...queries, sortBy: event.target.value });
  };

  let loadingMessage = "Loading...";
  if (isLoading === false) loadingMessage = "";

  return (
    <section id="reviewList">
      <div className="dropdown">
        <select name="category" id="category" onChange={categoryHandleChange}>
          <option value="">Categories</option>
          {categories.map((category, index) => {
            return (
              <option key={index} value={category.slug}>
                {category.slug[0].toUpperCase() + category.slug.slice(1)}
              </option>
            );
          })}
        </select>
        <select name="sortby" id="sortBy" onChange={sortbyHandleChange}>
          {reviewsGreenList.map((sortBy, index) => {
            return (
              <option key={index} value={sortBy}>
                {sortBy[0].toUpperCase() + sortBy.slice(1)}
              </option>
            );
          })}
        </select>
      </div>
      <p>{loadingMessage}</p>
      {reviews.map((review) => {
        return <ReviewCard key={review.review_id} review={review} />;
      })}
    </section>
  );
};

export default ReviewsList;
