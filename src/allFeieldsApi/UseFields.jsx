import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../hooks/UseAxiosSecure';

// ✅ Fetch all fields
export const useFields = () => {
  const axiosSecure = useAxiosSecure();
  return useQuery({
    queryKey: ['fields'],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/farmerfields');
      return data?.data || [];
    },
  });
};

// ✅ Add a new field
export const useAddField = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async field => {
      const { data } = await axiosSecure.post('/farmerfields', field);
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries(['fields']),
  });
};

// ✅ Update a field
export const useUpdateField = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }) => {
      const { data } = await axiosSecure.put(`/farmerfields/${id}`, updates);
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries(['fields']),
  });
};

// ✅ Delete a field
export const useDeleteField = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async id => {
      const { data } = await axiosSecure.delete(`/farmerfields/${id}`);
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries(['fields']),
  });
};
