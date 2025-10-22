import useAxiosSecure from '@/hooks/useAxiosSecure';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// ✅ Fetch all fields
export const useFields = () => {
  const axiosSecure = useAxiosSecure();
  return useQuery({
    queryKey: ['fields'],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/fields');
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
      const { data } = await axiosSecure.post('/fields', field);
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
      const { data } = await axiosSecure.put(`/fields/${id}`, updates);
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
      const { data } = await axiosSecure.delete(`/fields/${id}`);
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries(['fields']),
  });
};
