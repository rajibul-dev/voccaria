import { expressBackendBaseRESTOrigin } from "@/_constants/backendOrigins";
import axios from "axios";

const api = axios.create({
  baseURL: expressBackendBaseRESTOrigin,
  withCredentials: true,
});

export default api;
