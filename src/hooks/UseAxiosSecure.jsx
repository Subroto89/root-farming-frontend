import axios from "axios";

const useAxiosSecure = () => {
  const axiosSecure = axios.create({
    // baseURL: "http://localhost:3000"
    baseURL: "https://root-farmming.onrender.com"
  });

  return axiosSecure;
};

export default useAxiosSecure;
