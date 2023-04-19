import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
