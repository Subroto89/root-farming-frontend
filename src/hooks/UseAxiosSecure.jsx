import axios from 'axios';

const useAxiosSecure = () => {
  const axiosSecure = axios.create({
    // baseURL: 'http://localhost:3000',
    // baseURL: 'https://root-farmming.onrender.com',
    baseURL: `${import.meta.env.VITE_Server_API_KEY}`,
  });

  return axiosSecure;
};

export default useAxiosSecure;
