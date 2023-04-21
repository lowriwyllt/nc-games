import { useContext, useState } from "react";
import * as api from "../../../../api";
import { CurrentUserContext } from "../../../../contexts/CurrentUser";
import MyModal from "../General/Modal";
import PixelLoader from "../General/PixelLoader";

const CommentCard = ({
  comment,
  setComments,
  setCurrReview,
  setIsOpenDELETE,
}) => {
  //Props and Context
  const { currentUser } = useContext(CurrentUserContext);
  const [addedVotes, setAddedVotes] = useState(0);
  const [err, setErr] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  //Makes date readable
  const date = new Date(comment.created_at).toLocaleString();

  const votesHandleOnClick = (event) => {
    //optimistic rendering
    setAddedVotes(1);
    setErr(null);
    //api request
    api.patchCommentVotes(comment.comment_id).catch(() => {
      setAddedVotes(0);
      setErr("something went wrong, try again later");
    });
  };

  const deleteHandleOnClick = () => {
    setErr(null);
    setIsLoading(true);
    api
      .deleteComment(comment.comment_id)
      .then(() => {
        //takes the value of total comment on review down by one
        setCurrReview((nowCurrReview) => {
          //opens modal
          return {
            ...nowCurrReview,
            comment_count: nowCurrReview.comment_count - 1,
          };
        });
      })
      .then(() => {
        //Then set the array of comments to not include the one that we just deleted
        setIsOpenDELETE(true);
        setComments((currentCommentsArr) => {
          return currentCommentsArr.filter(
            (currCommentObj) => currCommentObj.comment_id !== comment.comment_id
          );
        });
        setIsLoading(false);
      })
      .catch((error) => {
        setErr("something went wrong, try again later");
        setIsLoading(false);
      });
  };

  return (
    <div className="commentCard">
      {isLoading ? (
        <PixelLoader loadingMessage={"Deleting comment..."} />
      ) : (
        <>
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
          {comment.author === currentUser.username ? (
            <button onClick={deleteHandleOnClick}>Delete</button>
          ) : null}
          {err ? <p>{err}</p> : null}
        </>
      )}
    </div>
  );
};

export default CommentCard;
