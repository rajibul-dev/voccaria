import axios from "axios";
import { config } from "dotenv";
config();

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_ORIGIN}/api`,
  withCredentials: true,
});

export default api;
