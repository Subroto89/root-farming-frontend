import axios from "axios";

const useAxiosSecure = () => {
  const axiosSecure = axios.create({
    baseURL: "http://localhost:3000"
    // baseURL: "https://root-farming.vercel.app"
  });

  return axiosSecure;
};

export default useAxiosSecure;
