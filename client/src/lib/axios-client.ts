import axios from "axios";

const createAPIClient = (baseURL: string) => {
  const options = {
    baseURL,
    withCredentials: true,
    timeout: 10000,
  };

  const client = axios.create(options);

  client.interceptors.response.use(
    (response) => response,
    async (error) => {
      const { data, status } = error.response;
      if (data === "Unauthorized" && status === 401) {
        window.location.href = "/";
      }
      return Promise.reject({ ...data });
    }
  );

  return client;
};

export const API = createAPIClient(import.meta.env.VITE_API_BASE_URL);
export const ECOM_API = createAPIClient(import.meta.env.VITE_ECOM_API_URL);