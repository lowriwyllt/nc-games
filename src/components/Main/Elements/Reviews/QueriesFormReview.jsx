import { useNavigate } from "react-router-dom";

const QueriesFormReview = ({ queries, categories, setQueries }) => {
  //Allowed to sort by
  const sortByGreenList = {
    date: "created_at",
    comments: "comment_count",
    votes: "votes",
  };

  let navigate = useNavigate();
  //handles when category changes
  const categoryHandleChange = (event) => {
    if (queries.order === "desc" && queries.sortBy === "created_at") {
      if (event.target.value === "") {
        setQueries((currentQueries) => {
          return { ...currentQueries, page: 1 };
        });
        navigate("/reviews");
      } else {
        setQueries((currentQueries) => {
          return { ...currentQueries, page: 1 };
        });
        navigate(`/categories/${event.target.value}/reviews`);
      }
    } else {
      if (event.target.value === "") {
        setQueries((currentQueries) => {
          return { ...currentQueries, page: 1 };
        });
        navigate(`/reviews?sort_by=${queries.sortBy}&order=${queries.order}`);
      } else {
        setQueries((currentQueries) => {
          return { ...currentQueries, page: 1 };
        });
        navigate(
          `/categories/${event.target.value}/reviews?sort_by=${queries.sortBy}&order=${queries.order}`
        );
      }
    }
  };

  //handle when sort by changes
  const sortbyHandleChange = (event) => {
    if (queries.order === "desc" && event.target.value === "created_at") {
      if (queries.category === "") {
        setQueries((currentQueries) => {
          return { ...currentQueries, page: 1 };
        });
        navigate("/reviews");
      } else {
        setQueries((currentQueries) => {
          return { ...currentQueries, page: 1 };
        });
        navigate(`/categories/${event.target.value}/reviews`);
      }
    } else {
      if (queries.category === "") {
        setQueries((currentQueries) => {
          return { ...currentQueries, page: 1 };
        });
        navigate(
          `/reviews?sort_by=${event.target.value}&order=${queries.order}`
        );
      } else {
        setQueries((currentQueries) => {
          return { ...currentQueries, page: 1 };
        });
        navigate(
          `/categories/${queries.category}/reviews?sort_by=${event.target.value}&order=${queries.order}`
        );
      }
    }
  };

  //handles when order changes
  const orderByHandleChange = (event) => {
    if (queries.order === "asc" && queries.sortBy === "created_at") {
      //because in this case asc will change to desc
      if (queries.category === "") {
        navigate("/reviews");
      } else {
        navigate(`/categories/${event.target.value}/reviews`);
      }
    } else {
      const newOrder = event.target.checked ? "asc" : "desc";
      if (queries.category === "") {
        navigate(`/reviews?sort_by=${queries.sortBy}&order=${newOrder}`);
      } else {
        navigate(
          `/categories/${queries.category}/reviews?sort_by=${queries.sortBy}&order=${newOrder}`
        );
      }
    }
  };

  return (
    <form className="dropdown">
      <div id="filterByCategory">
        <label htmlFor="category">Filter by:</label>
        <br />
        <select
          value={queries.category}
          name="category"
          id="category"
          onChange={categoryHandleChange}
        >
          <option value="">All categories</option>
          {categories.map((category, index) => {
            return (
              <option key={index} value={category.slug}>
                {category.slug[0].toUpperCase() + category.slug.slice(1)}
              </option>
            );
          })}
        </select>
      </div>
      <div id="sortOrderBy">
        <div>
          <label htmlFor="sortBy">Sort by:</label> <br />
          <select
            name="sortby"
            id="sortBy"
            onChange={sortbyHandleChange}
            value={queries.sortBy}
          >
            {Object.keys(sortByGreenList).map((sortByKey, index) => {
              return (
                <option key={index} value={sortByGreenList[sortByKey]}>
                  {sortByKey[0].toUpperCase() + sortByKey.slice(1)}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <label htmlFor="orderBy">Order by:</label>
          <br />
          <label className="switch">
            <input
              type="checkbox"
              id="orderBy"
              checked={queries.order === "desc" ? false : true}
              onChange={orderByHandleChange}
            />
            <span className="slider">
              <p>
                ASC <span className="clear">.</span>DESC
              </p>
            </span>
          </label>
        </div>
      </div>
    </form>
  );
};

export default QueriesFormReview;
