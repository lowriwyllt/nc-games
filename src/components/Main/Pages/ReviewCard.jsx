import { useState } from "react";
import * as api from "../../../api";
import CommentList from "./CommentList";
import { Link } from "react-router-dom";

const ReviewCard = ({ review, space }) => {
  const [err, setErr] = useState(null);
  const [addedVotes, setAddedVotes] = useState(0);
  const [comments, setComments] = useState(false);

  const votesHandleOnClick = (event) => {
    setAddedVotes(1);
    setErr(null);
    api.patchReviewVotes(review.review_id).catch(() => {
      setAddedVotes(0);
      setErr("something went wrong, try again later");
    });
  };

  const commentHandleOnClick = (event) => {
    setComments(!comments);
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
      <button onClick={votesHandleOnClick} disabled={addedVotes === 1}>
        Votes
      </button>
      {err ? <p>{err}</p> : null}
      <button onClick={commentHandleOnClick}>Comments</button>
      {comments ? <CommentList /> : null}
    </div>
  );
};

export default ReviewCard;
