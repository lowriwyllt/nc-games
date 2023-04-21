import { useEffect, useState } from "react";
import * as api from "../../../../api";
// import CommentCard from "./CommentCard";
import { Link } from "react-router-dom";
import MyModal from "../General/Modal";
import PixelLoader from "../General/PixelLoader";
import CommentList from "./CommentList";
import NewCommentForm from "./NewCommentForm";

const CommentArea = ({ reviewId, space, setCurrReview }) => {
  //Props and Contexts
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [disabledForm, setDisabledForm] = useState(true);
  const [modalIsOpenDELETE, setIsOpenDELETE] = useState(false);
  //Loads 3 comments if in list space and 10 if in single view
  useEffect(() => {
    setIsLoading(true);
    if (space === "list") {
      api.fetchCommentOnReview(reviewId, 3).then((data) => {
        setComments(data);
        setIsLoading(false);
      });
    } else if (space === "single") {
      api.fetchCommentOnReview(reviewId).then((data) => {
        setComments(data);
        setIsLoading(false);
      });
    }
  }, []);

  return (
    <div>
      {/* Modal will pop up after you submit a comment */}
      <MyModal
        modalIsOpen={modalIsOpen}
        setIsOpen={setIsOpen}
        contentLabel={"Comment Modal"}
        Content={() => {
          return <p>Your comment has been submitted!</p>;
        }}
      />
      <MyModal
        modalIsOpen={modalIsOpenDELETE}
        setIsOpen={setIsOpenDELETE}
        contentLabel={"Comment Delete Modal"}
        Content={() => {
          return <p>Your comment has been deleted!</p>;
        }}
      />
      {space === "single" ? (
        //If on single review
        !disabledForm ? (
          //if form not disabled
          <NewCommentForm
            reviewId={reviewId}
            comments={comments}
            setComments={setComments}
            setCurrReview={setCurrReview}
            setIsOpen={setIsOpen}
            setDisabledForm={setDisabledForm}
          />
        ) : (
          //to open form for new comment click button
          <button
            onClick={() => {
              setDisabledForm(false);
            }}
          >
            Add a comment
          </button>
        )
      ) : null}
      {isLoading ? (
        // if loading display loader
        <PixelLoader loadingMessage={"Loading..."} />
      ) : comments.length === 0 ? (
        // if not loading and no comments display text
        <p>No comment yet...</p>
      ) : (
        //if not loading show comments
        <CommentList
          setIsOpenDELETE={setIsOpenDELETE}
          comments={comments}
          setComments={setComments}
          setCurrReview={setCurrReview}
        />
      )}

      {space === "single" ? null : (
        //link from modal of the review list to the single page to see more comments
        <Link to={`/reviews/${reviewId}`} className="green">
          See all comments under the review...
        </Link>
      )}
    </div>
  );
};

export default CommentArea;
