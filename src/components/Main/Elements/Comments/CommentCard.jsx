import { useContext, useState } from "react";
import * as api from "../../../../api";
import { CurrentUserContext } from "../../../../contexts/CurrentUser";

const CommentCard = ({ comment }) => {
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
    //maybe need to make context for currentUser
    //button should only be there if comment.author === currentUser
    //then can make call to api etc
    //then use filter to not render that one
    console.log(comment.author);
    setErr("something went wrong, try again later");
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
      {}
      <button onClick={deleteHandleOnClick}>Delete</button>
      {err ? <p>{err}</p> : null}
    </div>
  );
};

export default CommentCard;
