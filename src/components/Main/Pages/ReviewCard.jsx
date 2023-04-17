const ReviewCard = ({ review }) => {
  const votesHandleOnClick = () => {};

  return (
    <div className="reviewCard">
      <h3>{review.title}</h3>
      <img src={review.review_img_url} alt={review.title} />
      <p>
        {review.owner} reviewed at {review.created_at}
      </p>
      <button>Votes</button>
      <button>Comments</button>
    </div>
  );
};

export default ReviewCard;
