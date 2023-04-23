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
  const [pageCount, setPageCount] = useState(0); //will be needed when I add pages

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
            queries.sort_by,
            queries.order,
            queries.limit,
            queries.page
          )
          .then((data) => {
            setReviews(data.reviews);
            setTotalCount(data.total_count);
            setPageCount(Math.ceil(data.total_count / queries.limit));
            setIsLoading(false);
          })
          .catch((CurrErr) => {
            setQueries({
              ...queries,
              category: "",
              order: "desc",
              sort_by: "created_at",
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

  const pagesArr = Array.from({ length: pageCount }, (_, i) => i + 1);

  const pageHandleOnClick = (event) => {
    setQueries((currentQueries) => {
      return { ...currentQueries, page: event.target.innerText };
    });
  };

  return (
    <section id="reviewList">
      <QueriesFormReview
        queries={queries}
        categories={categories}
        setQueries={setQueries}
      />
      {isLoading ? (
        //if loading show loader
        <PixelLoader loadingMessage={"Loading..."} />
      ) : (
        //adds all reviews in a different card each
        <div>
          <p>
            Seeing {reviews.length} of {totalCount} reviews
          </p>
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
          <p className="centeredText">Pages</p>
          <div className="pages">
            {pagesArr.map((pageNum) => (
              <button
                key={pageNum}
                onClick={pageHandleOnClick}
                className={pageNum == queries.page ? "green" : ""}
              >
                {pageNum}
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default ReviewsList;
