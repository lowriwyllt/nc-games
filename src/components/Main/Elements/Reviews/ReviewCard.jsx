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

  const votesHandleOnClick = (event) => {
    setAddedVotes(1);
    setErr(null);
    api.patchReviewVotes(review.review_id).catch(() => {
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

  const date = new Date(review.created_at).toLocaleString();

  return (
    <div className="reviewCard">
      <Link to={`/reviews/${review.review_id}`} className="reviewCardLink">
        <h3>{review.title}</h3>
        <img src={review.review_img_url} alt={review.title} />
        <p>
          <i>{review.owner}</i> reviewed at {date}
        </p>
        {space === "single" ? <br /> : null}
        {space === "single" ? <p>{review.review_body}</p> : null}
      </Link>
      <p>
        Votes: {review.votes + addedVotes} Comments: {review.comment_count}
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
                  reviewId={review.review_id}
                  currentUser={currentUser}
                  space={space}
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
              reviewId={review.review_id}
              currentUser={currentUser}
              space={space}
            />
          ) : null}
        </div>
      )}
    </div>
  );
};

export default ReviewCard;
