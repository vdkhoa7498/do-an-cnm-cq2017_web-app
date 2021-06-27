import Axios from "axios";
const server_address = process.env.REACT_APP_SERVER || `http://localhost:8000`
console.log("server_address", process.env.REACT_APP_SERVER)
let axios = Axios.create({
  baseURL: server_address,
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