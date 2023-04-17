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
    addQuery("category", category, count);
    addQuery("sort_by", sortBy, count);
    addQuery("order", order, count);
    addQuery("limit", limit, count);
    addQuery("p", page, count);
  }
  return gamesApi.get(url).then(({ data }) => data.categories);
};
