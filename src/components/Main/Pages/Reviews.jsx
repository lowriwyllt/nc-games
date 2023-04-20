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

  // useEffect(() => {
  //   console.log("this is run");
  //   console.log("searchSort", searchParams.get("sort_by"));
  //   const newSort = searchParams.get("sort_by")
  //     ? searchParams.get("sort_by")
  //     : "created_at";
  //   console.log("newSort", newSort);
  //   const newOrder = searchParams.get("order")
  //     ? searchParams.get("order")
  //     : "desc";
  //   setQueries({
  //     ...queries,
  //     order: newOrder,
  //     sortBy: newSort,
  //   });
  // }, [searchParams]);

  useEffect(() => {
    console.log("searchSort", searchParams.get("sort_by"));
    const newSort = searchParams.get("sort_by")
      ? searchParams.get("sort_by")
      : "created_at";
    const newOrder = searchParams.get("order")
      ? searchParams.get("order")
      : "desc";
    setQueries({
      ...queries,
      order: newOrder,
      sortBy: newSort,
    });
    if (category_slug) {
      setQueries({
        ...queries,
        category: category_slug,
        order: newOrder,
        sortBy: newSort,
      });
    } else {
      setQueries({
        ...queries,
        category: "",
        order: newOrder,
        sortBy: newSort,
      });
    }
  }, [category_slug, searchParams]);

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
