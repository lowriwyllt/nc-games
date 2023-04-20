import { useEffect, useState } from "react";
import * as api from "../../../../api";
import CommentCard from "./CommentCard";
import { Link } from "react-router-dom";
import MyModal from "../General/Modal";
import PixelLoader from "../General/PixelLoader";

const CommentList = ({ reviewId, currentUser, space, setCurrReview }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [commentBody, setCommentBody] = useState("");
  const [err, setErr] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [disabledForm, setDisabledForm] = useState(true);
  const [disabledSubmit, setdisabledSubmit] = useState(false);
  console.log(setCurrReview);

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
          setComments([data, ...comments]);
          setIsOpen(true);
          setDisabledForm(true);
        })
        .catch(() => {
          setErr("something went wrong, try again later");
          setdisabledSubmit(false);
        });
    }
  };

  const handleAddCommentOnClick = () => {
    setDisabledForm((currDisForm) => (currDisForm === true ? false : true));
  };

  console.log(setCurrReview);
  return (
    <div>
      <MyModal
        modalIsOpen={modalIsOpen}
        setIsOpen={setIsOpen}
        contentLabel={"Comment Modal"}
        Content={() => {
          return <p>Your comment has been submitted!</p>;
        }}
      />
      {isLoading ? (
        <PixelLoader />
      ) : comments.length === 0 ? (
        <p>No comment yet...</p>
      ) : (
        <div className="commentCards">
          {comments.map((comment) => {
            return (
              <CommentCard
                key={comment.comment_id}
                comment={comment}
                setComments={setComments}
                setCurrReview={setCurrReview}
              />
            );
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
            <div className="grow-wrap">
              <textarea
                id="commentBody"
                name="commentBody"
                placeholder="comment..."
                value={commentBody}
                onClick={handleOnClick}
                onChange={handleOnChange}
              />
            </div>
            <br />
            {err ? <p>{err}</p> : null}
            <button disabled={disabledSubmit}>Submit</button>
          </form>
        ) : (
          <button onClick={handleAddCommentOnClick}>Add a comment</button>
        )
      ) : (
        <Link to={`/reviews/${reviewId}`} className="green">
          See all comments...
        </Link>
      )}
    </div>
  );
};

export default CommentList;
