import { useContext, useState } from "react";
import * as api from "../../../../api";
import CommentList from "../Comments/CommentArea";
import { Link } from "react-router-dom";
import MyModal from "../General/Modal";
import { AllUsersContext } from "../../../../contexts/AllUsers";

const ReviewCard = ({ review, space }) => {
  //Props and Contexts
  const [err, setErr] = useState(null);
  const [addedVotes, setAddedVotes] = useState(0);
  const [isComments, setIsComments] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [currReview, setCurrReview] = useState(review);
  const { allUsers } = useContext(AllUsersContext);

  //Adds a vote
  const votesHandleOnClick = (event) => {
    setAddedVotes(1);
    setErr(null);
    api.patchReviewVotes(currReview.review_id).catch(() => {
      setAddedVotes(0);
      setErr("something went wrong, try again later");
    });
  };

  //Opens comment list when clicked in modal
  const commentHandleOnClickSingle = (event) => {
    setIsOpen(true);
  };

  //Opens and closes comment list in single Review
  const commentHandleOnClickList = () => {
    setIsComments(!isComments);
  };

  //makes date readable
  const date = new Date(currReview.created_at).toLocaleString();

  let imgAvatar;
  for (let i = 0; i < allUsers.length; i++) {
    if (currReview.owner === allUsers[i].username) {
      imgAvatar = allUsers[i].avatar_url;
    }
  }

  return (
    <div className="reviewCard">
      <Link to={`/reviews/${currReview.review_id}`} className="reviewCardLink">
        <h3>{currReview.title}</h3>
        <img
          className="reviewImg"
          src={currReview.review_img_url}
          alt={currReview.title}
        />
        <img
          className="icon"
          src={imgAvatar}
          alt={`${currReview.owner} avatar`}
        />
        <p>
          <i>{currReview.owner}</i> reviewed at {date}
        </p>
        {/* If single review adds body */}
        {space === "single" ? (
          <>
            <br />
            <p>{currReview.review_body}</p>
          </>
        ) : null}
      </Link>
      <p>
        Votes: {currReview.votes + addedVotes} Comments:{" "}
        {currReview.comment_count}
      </p>
      <button
        className="pixel-block"
        onClick={votesHandleOnClick}
        disabled={addedVotes === 1}
        aria-label="add vote to review"
      >
        <div className="pixelized--heart"></div>
      </button>
      {/* Shows error if error wtih  */}
      {err ? <p>{err}</p> : null}

      {space === "list" ? (
        // Button called comments opens modal with comments in list of reviews
        <>
          <button onClick={commentHandleOnClickSingle}>Comments</button>
          <MyModal
            modalIsOpen={modalIsOpen}
            setIsOpen={setIsOpen}
            contentLabel={"Comment Modal"}
            Content={() => {
              return (
                <CommentList
                  reviewId={currReview.review_id}
                  space={space}
                  setCurrReview={setCurrReview}
                />
              );
            }}
            id={"commentsModal"}
          />{" "}
        </>
      ) : (
        // button comments shows comments beneath
        <>
          <button onClick={commentHandleOnClickList}>Comments</button>
          {isComments ? (
            <CommentList
              reviewId={currReview.review_id}
              space={space}
              setCurrReview={setCurrReview}
              totalComments={currReview.comment_count}
            />
          ) : null}
        </>
      )}
    </div>
  );
};

export default ReviewCard;
