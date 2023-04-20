import { useContext, useState } from "react";
import { CurrentUserContext } from "../../../../contexts/CurrentUser";
import * as api from "../../../../api";

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

  const handleOnSubmit = (event) => {
    setdisabledSubmit(true);
    setCommentBody("");
    event.preventDefault();
    setErr(null);
    const requestObj = {
      username: currentUser,
      body: event.target.commentBody.value,
    };
    if (!requestObj.body) {
      setErr("Can't post an empty comment!");
      setdisabledSubmit(false);
    } else {
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
        })
        .catch(() => {
          setErr("something went wrong, try again later");
          setdisabledSubmit(false);
        });
    }
  };

  //As typing in comment form box update commentBody
  const handleOnChange = (event) => {
    setCommentBody(event.target.value);
  };

  return (
    <form className="commentCard" onSubmit={handleOnSubmit}>
      <p>{currentUser}</p>
      <br />
      <label htmlFor="commentBody">New comment...</label>
      <br />
      <div className="grow-wrap">
        <textarea
          id="commentBody"
          name="commentBody"
          placeholder="comment..."
          value={commentBody}
          onChange={handleOnChange}
        />
      </div>
      <br />
      {err ? <p>{err}</p> : null}
      <button disabled={disabledSubmit}>Submit</button>
    </form>
  );
};

export default NewCommentForm;
