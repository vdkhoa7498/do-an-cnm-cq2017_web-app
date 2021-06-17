import Axios from "axios";
let axios = Axios.create({
  baseURL: `http://localhost:8000`,
  headers: { "Content-Type": "application/json" },
});

// Add a request interceptor
// axios.interceptors.request.use(function (config) {
//   //get token
//   let token = JSON.parse(localStorage.getItem("token"));
//   config.headers.Authorization = token ? `Bearer ${token}` : "";
//   return config;
// });

export default axios;