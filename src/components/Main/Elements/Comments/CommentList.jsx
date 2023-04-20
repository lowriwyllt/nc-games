import { useState } from "react";
import MyModal from "../General/Modal";
import CommentCard from "./CommentCard";

const CommentList = ({ comments, setComments, setCurrReview }) => {
  const [modalIsOpenDELETE, setIsOpenDELETE] = useState(false);
  return (
    <div className="commentCards">
      <MyModal
        modalIsOpen={modalIsOpenDELETE}
        setIsOpen={setIsOpenDELETE}
        contentLabel={"Comment Delete Modal"}
        Content={() => {
          return <p>Your comment has been deleted!</p>;
        }}
      />
      {comments.map((comment) => {
        return (
          <CommentCard
            key={comment.comment_id}
            comment={comment}
            setComments={setComments}
            setCurrReview={setCurrReview}
            setIsOpenDELETE={setIsOpenDELETE}
          />
        );
      })}
    </div>
  );
};

export default CommentList;
