import axios from "axios";

const studentBaseUrl = axios.create({
  baseURL: "http://localhost:3000/student",
});

export default studentBaseUrl;