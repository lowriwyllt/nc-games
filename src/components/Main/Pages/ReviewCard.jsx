import { useState } from "react";
import * as api from "../../../api";
import CommentList from "./CommentList";
import { Link } from "react-router-dom";

const ReviewCard = ({ review }) => {
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
    <Link to={`/reviews/${review.review_id}`} className="reviewCard">
      <h3>{review.title}</h3>
      <img src={review.review_img_url} alt={review.title} />
      <p>
        {review.owner} reviewed at {date}
      </p>
      <p>Votes: {review.votes + addedVotes}</p>
      <button onClick={votesHandleOnClick} disabled={addedVotes === 1}>
        Votes
      </button>
      {err ? <p>{err}</p> : null}
      <button onClick={commentHandleOnClick}>Comments</button>

      {comments ? <CommentList /> : null}
    </Link>
  );
};

export default ReviewCard;
