import axios from "axios";

const isProd = import.meta.env.VITE_PROD;
console.log("Production mode:", isProd);
const API = axios.create({
  baseURL: isProd
    ? "https://taskmanger-flaskapp.onrender.com"
    : "http://127.0.0.1:5000/",
});

export default API;
