// const testUrl = "http://localhost:3000/reviews?sort_by=comment_count&order=asc";
// const newQueryObj = {};
// const testLocation = {
//   pathname: "/reviews",
//   search: "?sort_by=comment_count&order=desc",
//   hash: "",
//   state: null,
//   key: "nd94uxbp",
// };
// const testDefautQueries = {
//   category: "",
//   order: "desc",
//   sort_by: "created_at",
//   limit: 10,
//   page: 1,
// };

exports.queryAdder = (location, newQueryObj, defaultQueries) => {
  //gets an object of all the queries
  const queriesArr = location.search.slice(1).split("&"); //e.g. [ 'sort_by=comment_count', 'order=asc' ]
  const ArrayOfQueries = queriesArr.map((query) => query.split("=")); //e.g.[ [ 'sort_by', 'comment_count' ], [ 'order', 'asc' ] ]
  const queryObj = Object.fromEntries(ArrayOfQueries); //e.g. { sort_by: 'comment_count', order: 'asc' }

  const neededQueryObj = { ...queryObj, ...newQueryObj };

  let queryStr = "";
  if (Object.keys(neededQueryObj).length) {
    let count = 0;
    for (const property in neededQueryObj) {
      if (
        neededQueryObj[property] !== defaultQueries[property] &&
        property !== "category"
      ) {
        if (count > 0) {
          queryStr += "&";
        } else if (count === 0) {
          queryStr += "?";
        }
        queryStr += `${property}=${neededQueryObj[property]}`;
        count++;
      }
    }
  }

  const newUrl = location.pathname + queryStr;
  return { newUrl, queryStr };
};

// queryAdder(testLocation, newQueryObj, testDefautQueries);
