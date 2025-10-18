import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../hooks/UseAxiosSecure';

// ✅ Fetch all products
export const useProducts = (filters = {}) => {
  const axiosSecure = useAxiosSecure();
  return useQuery({
    queryKey: ['products', filters],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/products', { params: filters });
      return data;
    },
  });
};

export const useProduct = id => {
  const axiosSecure = useAxiosSecure();
  return useQuery({
    queryKey: ['product', id],
    enabled: !!id,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/products/${id}`);
      return data;
    },
  });
};
