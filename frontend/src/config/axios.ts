import axios from "axios";

const getAxiosInstance = (baseURL: string) => {
  return axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*",
      Authorization: "Bearer 123",
    },
  });
};

const axiosInstances = {
  default: getAxiosInstance(
    "http://localhost:8001/api/v1"
  ),
  auth: getAxiosInstance(
    process.env.BACKEND_BASE_URL || "http://localhost:8001/api/v1"
  )
};

export default axiosInstances;
