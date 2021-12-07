import axios from "axios";

const instance = axios.create({
  // baseURL:"http://localhost:8001"
  baseURL: process.env.HOST_URL,
});

export default instance;
