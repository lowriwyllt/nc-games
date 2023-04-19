import * as api from "../../../../api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReviewCard from "./ReviewCard";
import PixelLoader from "../General/PixelLoader";

const ReviewsList = ({
  categories,
  setCategories,
  isLoading,
  setIsLoading,
  setQueries,
  queries,
  currentUser,
}) => {
  const [reviews, setReviews] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [pageCount, setPageCount] = useState(10);
  const [sortBy, setSortBy] = useState("created_at");

  const sortByGreenList = {
    date: "created_at",
    // "comment count":, - don't think I did this in backend
    votes: "votes",
  };

  useEffect(() => {
    setIsLoading(true);
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
            setReviews(data.reviews);
            setTotalCount(data.total_count);
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

  const orderByHandleChange = (event) => {
    setSortBy((currSortBy) => (currSortBy === "desc" ? "asc" : "desc"));
  };

  return (
    <section id="reviewList">
      <form className="dropdown">
        <select
          defaultValue={queries.category}
          name="category"
          id="category"
          onChange={categoryHandleChange}
        >
          <option value="">All categories</option>
          {categories.map((category, index) => {
            return (
              <option key={index} value={category.slug}>
                {category.slug[0].toUpperCase() + category.slug.slice(1)}
              </option>
            );
          })}
        </select>
        <select name="sortby" id="sortBy" onChange={sortbyHandleChange}>
          {Object.keys(sortByGreenList).map((sortByKey, index) => {
            return (
              <option key={index} value={sortByGreenList[sortByKey]}>
                {sortByKey[0].toUpperCase() + sortByKey.slice(1)}
              </option>
            );
          })}
        </select>
        <label className="switch">
          <input type="checkbox" onChange={orderByHandleChange} />
          <span className="slider round"></span>
        </label>
      </form>
      {isLoading ? (
        <PixelLoader />
      ) : (
        <div>
          {" "}
          <div className="reviewCards">
            {reviews.map((review) => {
              return (
                <ReviewCard
                  key={review.review_id}
                  review={review}
                  space={"list"}
                  currentUser={currentUser}
                />
              );
            })}
          </div>
          <p>Pages</p>
          <p>Page numbers will go here</p>
        </div>
      )}
    </section>
  );
};

export default ReviewsList;
