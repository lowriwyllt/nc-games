import { useEffect, useState } from "react";
import * as api from "../../../api";
import CommentCard from "./CommentCard";
import { Link } from "react-router-dom";
import CommentModal from "./CommentModal";

const CommentList = ({ reviewId, currentUser, space }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [commentBody, setCommentBody] = useState("Comment...");
  const [err, setErr] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [disabledForm, setDisabledForm] = useState(false);
  const [disabledSubmit, setdisabledSubmit] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    if (space === "list") {
      api.fetchCommentOnReview(reviewId, 3).then((data) => {
        setComments(data);
        setIsLoading(false);
      });
    } else if (space === "single") {
      api.fetchCommentOnReview(reviewId).then((data) => {
        setComments(data);
        setIsLoading(false);
      });
    }
  }, []);

  const handleOnClick = () => {
    if (commentBody === "Comment...") {
      setCommentBody("");
    }
  };

  const handleOnChange = (event) => {
    setCommentBody(event.target.value);
  };

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
          setComments([...comments, data]);
          setIsOpen(true);
          setDisabledForm(true);
        })
        .catch(() => {
          setErr("something went wrong, try again later");
          setdisabledSubmit(false);
        });
    }
  };

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : comments.length === 0 ? (
        <p>No comment yet...</p>
      ) : (
        <div className="commentCards">
          {comments.map((comment) => {
            return <CommentCard key={comment.comment_id} comment={comment} />;
          })}
        </div>
      )}
      {space === "single" ? (
        !disabledForm ? (
          <form className="commentCard" onSubmit={handleOnSubmit}>
            <p>{currentUser}</p>
            <br />
            <label htmlFor="commentBody">New comment...</label>
            <br />
            <textarea
              id="commentBody"
              name="commentBody"
              value={commentBody}
              onClick={handleOnClick}
              onChange={handleOnChange}
            />
            <br />
            {err ? <p>{err}</p> : null}
            <button disabled={disabledSubmit}>Submit</button>
          </form>
        ) : null
      ) : (
        <Link to={`/reviews/${reviewId}`} className="green">
          See all comments...
        </Link>
      )}
      <CommentModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default CommentList;
