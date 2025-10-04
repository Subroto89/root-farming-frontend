import axios from "axios";

const useAxiosSecure = () => {
  const axiosSecure = axios.create({
    baseURL: "http://localhost:3000",
    // baseURL: "https://root-farming-bzdjl6a6d-subroto89s-projects.vercel.app"
  });

  return axiosSecure;
};

export default useAxiosSecure;
