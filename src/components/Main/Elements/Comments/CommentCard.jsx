import { useState } from "react";
import * as api from "../../../../api";

const CommentCard = ({ comment }) => {
  const [addedVotes, setAddedVotes] = useState(0);
  const [err, setErr] = useState(null);
  const date = new Date(comment.created_at).toLocaleString();

  const votesHandleOnClick = (event) => {
    setAddedVotes(1);
    setErr(null);
    api.patchCommentVotes(comment.comment_id).catch(() => {
      setAddedVotes(0);
      setErr("something went wrong, try again later");
    });
  };

  return (
    <div className="commentCard">
      <p>
        <i>{comment.author}</i> commented at {date}
      </p>
      <br />
      <p>{comment.body}</p>
      <p>Votes: {comment.votes + addedVotes}</p>
      <button
        className="pixel-block"
        onClick={votesHandleOnClick}
        disabled={addedVotes === 1}
      >
        <div class="pixelized--heart"></div>
      </button>
    </div>
  );
};

export default CommentCard;
