import axios from "axios";

const API = axios.create({
  baseURL: "http://51.21.250.111:5000/api"
});

export default API;