import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../hooks/UseAxiosSecure';

// ✅ Fetch unique categories
export const useCategories = () => {
  const axiosSecure = useAxiosSecure();
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/products');
      const categories = [
        'All',
        ...new Set(data.map(p => p.category).filter(Boolean)),
      ];
      return categories;
    },
  });
};

// ✅ Fetch unique locations
export const useLocations = () => {
  const axiosSecure = useAxiosSecure();
  return useQuery({
    queryKey: ['locations'],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/products');
      const locations = [
        'All',
        ...new Set(data.map(p => p.location).filter(Boolean)),
      ];
      return locations;
    },
  });
};
