import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Header from "../Elements/General/Header";
import ReviewsList from "../Elements/Reviews/ReviewsList";

const Reviews = ({
  setActiveNavbar,
  categories,
  setCategories,
  isLoading,
  setIsLoading,
  currentUser,
  queries,
  setQueries,
}) => {
  const { category_slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setQueries({
      ...queries,
      sortBy: searchParams.get("sort_by"),
      order: searchParams.get("order"),
    });
  }, [searchParams]);

  useEffect(() => {
    if (category_slug) {
      setQueries({ ...queries, category: category_slug });
    } else {
      setQueries({ ...queries, category: "" });
    }
  }, [category_slug]);

  return (
    <main>
      <Header setActiveNavbar={setActiveNavbar} />
      <h2>Reviews</h2>
      <ReviewsList
        currentUser={currentUser}
        queries={queries}
        setQueries={setQueries}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        categories={categories}
        setCategories={setCategories}
      />
    </main>
  );
};

export default Reviews;
