const queryAdder = (location, newQueryObj, defaultQueries) => {
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

export default queryAdder;
