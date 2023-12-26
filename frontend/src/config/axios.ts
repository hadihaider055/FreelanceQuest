import axios from "axios";

const getAxiosInstance = (baseURL: string) => {
  return axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*",
      Authorization: "Bearer 123"
    },
  });
};

const axiosInstances = {
  default: getAxiosInstance(
    process.env.BACKEND_BASE_URL_FOR_CONTAINER || "http://localhost:8001/api/v1"
  ),
};

export default axiosInstances;
