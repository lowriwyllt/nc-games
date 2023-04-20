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
  queries,
  currentUser,
}) => {
  const [reviews, setReviews] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [pageCount, setPageCount] = useState(10);

  const sortByGreenList = {
    date: "created_at",
    comments: "comment_count",
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
    if (queries.order === "desc" && queries.sortBy === "created_at") {
      if (event.target.value === "") {
        navigate("/reviews");
      } else {
        navigate(`/categories/${event.target.value}/reviews`);
      }
    } else {
      if (event.target.value === "") {
        navigate(`/reviews?sort_by=${queries.sortBy}&order=${queries.order}`);
      } else {
        navigate(
          `/categories/${event.target.value}/reviews?sort_by=${queries.sortBy}&order=${queries.order}`
        );
      }
    }
  };

  const sortbyHandleChange = (event) => {
    if (queries.order === "desc" && event.target.value === "created_at") {
      if (queries.category === "") {
        navigate("/reviews");
      } else {
        navigate(`/categories/${event.target.value}/reviews`);
      }
    } else {
      if (queries.category === "") {
        navigate(
          `/reviews?sort_by=${event.target.value}&order=${queries.order}`
        );
      } else {
        navigate(
          `/categories/${queries.category}/reviews?sort_by=${event.target.value}&order=${queries.order}`
        );
      }
    }
  };

  const orderByHandleChange = (event) => {
    if (queries.order === "asc" && queries.sortBy === "created_at") {
      //because in this case asc will change to desc
      if (queries.category === "") {
        navigate("/reviews");
      } else {
        navigate(`/categories/${event.target.value}/reviews`);
      }
    } else {
      const newOrder = event.target.checked ? "asc" : "desc";
      if (queries.category === "") {
        navigate(`/reviews?sort_by=${queries.sortBy}&order=${newOrder}`);
      } else {
        navigate(
          `/categories/${queries.category}/reviews?sort_by=${queries.sortBy}&order=${newOrder}`
        );
      }
    }
  };

  return (
    <section id="reviewList">
      <form className="dropdown">
        <select
          value={queries.category}
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
        <select
          name="sortby"
          id="sortBy"
          onChange={sortbyHandleChange}
          value={queries.sortBy}
        >
          {Object.keys(sortByGreenList).map((sortByKey, index) => {
            return (
              <option key={index} value={sortByGreenList[sortByKey]}>
                {sortByKey[0].toUpperCase() + sortByKey.slice(1)}
              </option>
            );
          })}
        </select>
        <label className="switch">
          <input
            type="checkbox"
            checked={queries.order === "desc" ? false : true}
            onChange={orderByHandleChange}
          />
          <span className="slider">
            <p>
              ASC <span className="clear">.</span>DESC
            </p>
          </span>
        </label>
      </form>
      {isLoading ? (
        <PixelLoader />
      ) : (
        <div>
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
