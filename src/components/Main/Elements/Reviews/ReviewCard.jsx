import { useContext, useState } from "react";
import * as api from "../../../../api";
import CommentList from "../Comments/CommentList";
import { Link } from "react-router-dom";
import MyModal from "../General/Modal";
import { CurrentUserContext } from "../../../../contexts/CurrentUser";

const ReviewCard = ({ review, space }) => {
  const [err, setErr] = useState(null);
  const [addedVotes, setAddedVotes] = useState(0);
  const [isComments, setIsComments] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const { currentUser } = useContext(CurrentUserContext);
  const [currReview, setCurrReview] = useState(review);

  const votesHandleOnClick = (event) => {
    setAddedVotes(1);
    setErr(null);
    api.patchReviewVotes(currReview.review_id).catch(() => {
      setAddedVotes(0);
      setErr("something went wrong, try again later");
    });
  };

  const commentHandleOnClickSingle = (event) => {
    setIsOpen(true);
  };

  const commentHandleOnClickList = () => {
    setIsComments(!isComments);
  };

  const date = new Date(currReview.created_at).toLocaleString();

  return (
    <div className="reviewCard">
      <Link to={`/reviews/${currReview.review_id}`} className="reviewCardLink">
        <h3>{currReview.title}</h3>
        <img src={currReview.review_img_url} alt={currReview.title} />
        <p>
          <i>{currReview.owner}</i> reviewed at {date}
        </p>
        {space === "single" ? <br /> : null}
        {space === "single" ? <p>{currReview.review_body}</p> : null}
      </Link>
      <p>
        Votes: {currReview.votes + addedVotes} Comments:{" "}
        {currReview.comment_count}
      </p>
      <button
        className="pixel-block"
        onClick={votesHandleOnClick}
        disabled={addedVotes === 1}
      >
        <div className="pixelized--heart"></div>
      </button>
      {err ? <p>{err}</p> : null}

      {space === "list" ? (
        <div>
          <button onClick={commentHandleOnClickSingle}>Comments</button>
          <MyModal
            modalIsOpen={modalIsOpen}
            setIsOpen={setIsOpen}
            contentLabel={"Comment Modal"}
            Content={() => {
              return (
                <CommentList
                  reviewId={currReview.review_id}
                  currentUser={currentUser}
                  space={space}
                  setCurrReview={setCurrReview}
                />
              );
            }}
            id={"commentsModal"}
          />{" "}
        </div>
      ) : (
        <div>
          <button onClick={commentHandleOnClickList}>Comments</button>
          {isComments ? (
            <CommentList
              reviewId={currReview.review_id}
              currentUser={currentUser}
              space={space}
              setCurrReview={setCurrReview}
            />
          ) : null}
        </div>
      )}
    </div>
  );
};

export default ReviewCard;
