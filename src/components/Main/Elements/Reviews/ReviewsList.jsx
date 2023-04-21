import * as api from "../../../../api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReviewCard from "./ReviewCard";
import PixelLoader from "../General/PixelLoader";
import QueriesFormReview from "./QueriesFormReview";

const ReviewsList = ({
  categories,
  setCategories,
  isLoading,
  setIsLoading,
  queries,
  setErr,
  setQueries,
}) => {
  //State and Contexts
  const [reviews, setReviews] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  // const [pageCount, setPageCount] = useState(10); will be needed when I add pages

  //gets data about categories and reviews
  useEffect(() => {
    setErr(null);
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
          })
          .catch((CurrErr) => {
            setQueries({
              ...queries,
              category: "",
            });
            setIsLoading(false);
            setErr({
              errCode: CurrErr.response.status,
              errMsg: CurrErr.response.data.msg,
            });
          });
      })
      .catch((CurrErr) => {
        setIsLoading(false);
        setErr({
          errCode: CurrErr.response.status,
          errMsg: CurrErr.response.data.msg,
        });
      });
  }, [queries]);

  return (
    <section id="reviewList">
      <QueriesFormReview queries={queries} categories={categories} />
      {isLoading ? (
        //if loading show loader
        <PixelLoader loadingMessage={"Loading..."} />
      ) : (
        //adds all reviews in a different card each
        <div>
          <div className="reviewCards">
            {reviews.map((review) => {
              return (
                <ReviewCard
                  key={review.review_id}
                  review={review}
                  space={"list"}
                />
              );
            })}
          </div>
          {/* Pages for when I add multiple pages */}
          <p>Pages</p>
          <p>Page numbers will go here</p>
        </div>
      )}
    </section>
  );
};

export default ReviewsList;
