import { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Header from "../Elements/General/Header";
import ReviewsList from "../Elements/Reviews/ReviewsList";

const Reviews = ({
  categories,
  setCategories,
  isLoading,
  setIsLoading,
  currentUser,
  queries,
  setQueries,
}) => {
  //gets data from URL
  const { category_slug } = useParams();
  const [searchParams] = useSearchParams();

  //add data from URL to queries
  useEffect(() => {
    setQueries({
      ...queries,
      category: category_slug ? category_slug : "",
      order: searchParams.get("order") ? searchParams.get("order") : "desc",
      sortBy: searchParams.get("sort_by")
        ? searchParams.get("sort_by")
        : "created_at",
    });
  }, [category_slug, searchParams]);

  return (
    <main>
      <Header />
      <h2>Reviews</h2>
      <ReviewsList
        currentUser={currentUser}
        queries={queries}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        categories={categories}
        setCategories={setCategories}
      />
    </main>
  );
};

export default Reviews;
