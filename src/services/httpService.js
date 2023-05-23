import axios from "axios";
import { toast } from "react-toastify";
//null is that we don't want to intercept successful responses
axios.interceptors.response.use(null, (error) => {
  // called before the catch block
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    console.log("Logging the error", error);
    toast.error("An unexpected error occuurred.");
  }

  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  patch: axios.patch,
};
