import { useEffect, useState } from "react";
import Header from "./Header";
import ReviewsList from "./ReviewsList";
import { useParams } from "react-router-dom";

const Reviews = ({
  setActiveNavbar,
  categories,
  setCategories,
  isLoading,
  setIsLoading,
}) => {
  const [queries, setQueries] = useState({});
  const { category_slug } = useParams();

  useEffect(() => {
    setQueries({ ...queries, category: category_slug });
  }, [category_slug, queries]);

  return (
    <main>
      <Header setActiveNavbar={setActiveNavbar} />
      <h2>Reviews</h2>
      <ReviewsList
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
