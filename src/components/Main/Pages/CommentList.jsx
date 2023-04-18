import { useEffect, useState } from "react";
import * as api from "../../../api";
import CommentCard from "./CommentCard";

const CommentList = ({ reviewId, currentUser }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [commentBody, setCommentBody] = useState("Comment...");
  const [err, setErr] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    api.fetchCommentOfReview(reviewId).then((data) => {
      setComments(data);
      setIsLoading(false);
    });
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
    event.preventDefault();
    setErr(null);
    const requestObj = {
      username: currentUser,
      body: event.target.commentBody.value,
    };
    api
      .postCommentOfReview(reviewId, requestObj)
      .then((data) => {
        setComments([...comments, data]);
      })
      .catch(() => {
        setErr("something went wrong, try again later");
      });
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
        <button>Submit</button>
      </form>
    </div>
  );
};

export default CommentList;
