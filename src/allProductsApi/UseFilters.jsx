import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../hooks/UseAxiosSecure';

// Fetch unique categories from backend
export const useCategories = () => {
  const axiosSecure = useAxiosSecure();
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/manage/shop-all-products', { params: {} });
      return ['All', ...new Set(data.map(p => p?.category?.categoryName).filter(Boolean))];
    },
  });
};

// Fetch unique locations from backend
export const useLocations = () => {
  const axiosSecure = useAxiosSecure();
  return useQuery({
    queryKey: ['locations'],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/manage/shop-all-products', { params: {} });
      return ['All', ...new Set(data.map(p => p?.location).filter(Boolean))];
    },
  });
};

// Fetch unique types
export const useTypes = () => {
  const axiosSecure = useAxiosSecure();
  return useQuery({
    queryKey: ['types'],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/manage/shop-all-products', { params: {} });
      return ['All', ...new Set(data.map(p => p?.type?.typeName).filter(Boolean))];
    },
  });
};

// Fetch unique subcategories
export const useSubCategories = () => {
  const axiosSecure = useAxiosSecure();
  return useQuery({
    queryKey: ['subCategories'],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/manage/shop-all-products', { params: {} });
      return ['All', ...new Set(data.map(p => p?.subCategory?.subCategoryName).filter(Boolean))];
    },
  });
};

// Fetch unique variants
export const useVariants = () => {
  const axiosSecure = useAxiosSecure();
  return useQuery({
    queryKey: ['variants'],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/manage/shop-all-products', { params: {} });
      return ['All', ...new Set(data.map(p => p?.variant?.variantName).filter(Boolean))];
    },
  });
};
