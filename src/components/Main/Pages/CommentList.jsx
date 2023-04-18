import { useEffect, useState } from "react";
import * as api from "../../../api";
import CommentCard from "./CommentCard";

const CommentList = ({ reviewId }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    api.fetchCommentOfReview(reviewId).then((data) => {
      setComments(data);
      setIsLoading(false);
    });
  }, []);
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
    </div>
  );
};

export default CommentList;
