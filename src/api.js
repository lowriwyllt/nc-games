import axios from "axios";

const gamesApi = axios.create({
  baseURL: "https://nc-backend-games.onrender.com/api",
});

//Categories
export const fetchCategories = () => {
  return gamesApi.get("/categories").then(({ data }) => data.categories);
};

//Reviews
export const fetchReviews = (category, sortBy, order, limit, page) => {
  let url = "/reviews";
  if (category || sortBy || order || limit || page) {
    url += "?";
    let count = 0;

    if (category) {
      if (count > 0) url += "&";
      url += `${"category"}=${category}`;
      count++;
    }
    if (sortBy) {
      if (count > 0) url += "&";
      url += `${"sort_by"}=${sortBy}`;
      count++;
    }
    if (order) {
      if (count > 0) url += "&";
      url += `${"order"}=${order}`;
      count++;
    }
    if (limit) {
      if (count > 0) url += "&";
      url += `${"limit"}=${limit}`;
      count++;
    }
    if (page) {
      if (count > 0) url += "&";
      url += `${"p"}=${page}`;
      count++;
    }
  }
  return gamesApi.get(url).then(({ data }) => data.reviews);
};