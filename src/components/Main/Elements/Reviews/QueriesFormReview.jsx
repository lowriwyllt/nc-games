import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CurrentPathContext } from "../../../../contexts/CurrentPath";
import { queryAdder } from "../../../QueryAdder";

const QueriesFormReview = ({ queries, categories, setQueries }) => {
  const { currentPath } = useContext(CurrentPathContext);
  //Allowed to sort by
  const sortByGreenList = {
    date: "created_at",
    comments: "comment_count",
    votes: "votes",
  };

  const defaultQuery = {
    category: "",
    order: "desc",
    sort_by: "created_at",
    limit: 10,
    page: 1,
  };

  let navigate = useNavigate();
  //handles when category changes
  const categoryHandleChange = (event) => {
    if (event.target.value === "") {
      const { queryStr } = queryAdder(
        currentPath,
        { ...queries, page: 1 },
        defaultQuery
      );
      navigate(`/reviews${queryStr}`);
    } else {
      const { queryStr } = queryAdder(
        currentPath,
        { ...queries, page: 1 },
        defaultQuery
      );
      navigate(`/categories/${event.target.value}/reviews${queryStr}`);
    }
  };

  //handle when sort by changes
  const sortbyHandleChange = (event) => {
    const { newUrl } = queryAdder(
      currentPath,
      { ...queries, page: 1, sort_by: event.target.value },
      defaultQuery
    );
    navigate(newUrl);
  };

  //handles when order changes
  const orderByHandleChange = (event) => {
    const { newUrl } = queryAdder(
      currentPath,
      { ...queries, page: 1, order: event.target.checked ? "asc" : "desc" },
      defaultQuery
    );
    navigate(newUrl);
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
            value={queries.sort_by}
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
