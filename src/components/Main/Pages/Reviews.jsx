import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Header from "../Elements/General/Header";
import ReviewsList from "../Elements/Reviews/ReviewsList";
import ErrorPage from "../ErrorPage";

const Reviews = ({
  categories,
  setCategories,
  isLoading,
  setIsLoading,
  queries,
  setQueries,
}) => {
  //gets data from URL
  const { category_slug } = useParams();
  const [searchParams] = useSearchParams();
  const [err, setErr] = useState(null);

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

  if (err) {
    return <ErrorPage errCode={err.errCode} errMsg={err.errMsg} />;
  }
  return (
    <main>
      <Header />
      <h2>Reviews</h2>
      <ReviewsList
        setErr={setErr}
        queries={queries}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        categories={categories}
        setCategories={setCategories}
        setQueries={setQueries}
      />
    </main>
  );
};

export default Reviews;
