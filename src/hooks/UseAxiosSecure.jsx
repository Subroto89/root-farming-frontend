import axios from "axios";

const useAxiosSecure = () => {
   const axiosSecure = axios.create({
      baseURL: `${import.meta.env.VITE_Server_API_KEY}`,
   });

   return axiosSecure;
};

export default useAxiosSecure;
