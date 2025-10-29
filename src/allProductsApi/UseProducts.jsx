import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../hooks/UseAxiosSecure';

// ------------------ Fetch all products with filters ------------------
export const useProducts = (filters = {}) => {
  const axiosSecure = useAxiosSecure();
  return useQuery({
    queryKey: ['products', filters],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/manage/shop-all-products', { params: filters });
      return data;
    },
    keepPreviousData: true, // keeps previous data while loading new filtered results
  });
};

// ------------------ Fetch single product by ID ------------------
export const useProduct = (id) => {
  const axiosSecure = useAxiosSecure();
  return useQuery({
    queryKey: ['product', id],
    enabled: !!id,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/manage/shop-product/${id}`);
      return data;
    },
  });
};
