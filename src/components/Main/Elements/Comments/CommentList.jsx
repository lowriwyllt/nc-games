import { useState } from "react";
import MyModal from "../General/Modal";
import CommentCard from "./CommentCard";

const CommentList = ({
  comments,
  setComments,
  setCurrReview,
  setIsOpenDELETE,
  totalComments,
}) => {
  return (
    <div className="commentCards">
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
