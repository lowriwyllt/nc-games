import { useContext, useState } from "react";
import { CurrentUserContext } from "../../../../contexts/CurrentUser";
import * as api from "../../../../api";
import PixelLoader from "../General/PixelLoader";

const NewCommentForm = ({
  reviewId,
  comments,
  setComments,
  setCurrReview,
  setIsOpen,
  setDisabledForm,
}) => {
  const [commentBody, setCommentBody] = useState("");
  const [err, setErr] = useState(null);
  const [disabledSubmit, setdisabledSubmit] = useState(false);
  const { currentUser } = useContext(CurrentUserContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleOnSubmit = (event) => {
    setdisabledSubmit(true);
    setIsLoading(true);
    setCommentBody("");
    event.preventDefault();
    setErr(null);
    const requestObj = {
      username: currentUser.username,
      body: event.target.commentBody.value,
    };

    api
      .postCommentOfReview(reviewId, requestObj)
      .then((data) => {
        setComments([data, ...comments]);
        //takes the value of total comment on review up by one
        setCurrReview((nowCurrReview) => {
          return {
            ...nowCurrReview,
            comment_count: nowCurrReview.comment_count + 1,
          };
        });
        setIsOpen(true);
        setDisabledForm(true);
        setdisabledSubmit(false);
        setIsLoading(false);
      })
      .catch(() => {
        setErr("something went wrong, try again later");
        setdisabledSubmit(false);
        setIsLoading(false);
      });
  };

  //As typing in comment form box update commentBody
  const handleOnChange = (event) => {
    setCommentBody(event.target.value);
  };

  return (
    <form className="commentCard" onSubmit={handleOnSubmit}>
      <p>{currentUser.username}</p>
      <br />
      <label htmlFor="commentBody">New comment...</label>
      <br />
      {isLoading ? (
        <PixelLoader loadingMessage={"Posting your comment..."} />
      ) : (
        <div className="grow-wrap">
          <textarea
            required
            id="commentBody"
            name="commentBody"
            placeholder="comment..."
            value={commentBody}
            onChange={handleOnChange}
          />
        </div>
      )}
      <br />
      {err ? <p>{err}</p> : null}
      <button disabled={disabledSubmit}>Submit</button>
    </form>
  );
};

export default NewCommentForm;
