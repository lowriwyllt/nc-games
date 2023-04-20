import { useContext, useState } from "react";
import * as api from "../../../../api";
import { CurrentUserContext } from "../../../../contexts/CurrentUser";

const CommentCard = ({ comment, setComments, setCurrReview }) => {
  const { currentUser } = useContext(CurrentUserContext);
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

  const deleteHandleOnClick = () => {
    setErr(null);
    api
      .deleteComment(comment.comment_id)
      .then(() => {
        //takes the value of total comment on review down by one
        console.log(setCurrReview);
        setCurrReview((nowCurrReview) => {
          return {
            ...nowCurrReview,
            comment_count: nowCurrReview.comment_count - 1,
          };
        });
      })
      .then(() => {
        //Then set the array of comments to not include the one that we just deleted
        setComments((currentCommentsArr) => {
          return currentCommentsArr.filter(
            (currCommentObj) => currCommentObj.comment_id !== comment.comment_id
          );
        });
      })
      .catch((error) => {
        console.log(error);
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
        <div className="pixelized--heart"></div>
      </button>
      {comment.author === currentUser ? (
        <button onClick={deleteHandleOnClick}>Delete</button>
      ) : null}
      {err ? <p>{err}</p> : null}
    </div>
  );
};

export default CommentCard;
