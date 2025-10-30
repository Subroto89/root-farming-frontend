import { useMemo } from "react";
import axios from "axios";
import { getAuth } from "firebase/auth";

const useAxiosSecure = () => {
   const axiosSecure = useMemo(() => {
      const instance = axios.create({
         baseURL: import.meta.env.VITE_Server_API_KEY,
      });

      // Add request interceptor for protected routes
      instance.interceptors.request.use(
         async (config) => {
            // If the route is protected, attach token
            if (config.protected) {
               const auth = getAuth();
               const user = auth.currentUser;
               if (!user) throw new Error("User not logged in");

               const idToken = await user.getIdToken();
               config.headers.Authorization = `Bearer ${idToken}`;
            }
            return config;
         },
         (error) => Promise.reject(error)
      );

      return instance;
   }, []);

   return axiosSecure;
};

export default useAxiosSecure;
