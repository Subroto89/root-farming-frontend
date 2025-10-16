import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../hooks/UseAxiosSecure';

export const useWishlist = userEmail => {
  const axiosSecure = useAxiosSecure();
  return useQuery({
    queryKey: ['wishlist', userEmail],
    enabled: !!userEmail,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/wishlist/${userEmail}`);
      return data;
    },
  });
};

export const useAddToWishlist = () => {
  const axiosSecure = useAxiosSecure();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async item => {
      const { data } = await axiosSecure.post('/wishlist', item);
      return data;
    },
    onSuccess: (_, variables) => {
      if (variables.userEmail)
        qc.invalidateQueries(['wishlist', variables.userEmail]);
    },
  });
};

export const useDeleteWishlist = () => {
  const axiosSecure = useAxiosSecure();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({ userEmail, productId }) => {
      const { data } = await axiosSecure.delete(
        `/wishlist/${userEmail}/${productId}`
      );
      return data;
    },
    onSuccess: (_, variables) => {
      qc.invalidateQueries(['wishlist', variables.userEmail]);
    },
  });
};
