import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../hooks/UseAxiosSecure';

export const useLatestReviews = () => {
  const axiosSecure = useAxiosSecure();
  return useQuery({
    queryKey: ['latestReviews'],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/reviews');
      return data;
    },
  });
};

export const useProductReviews = productId => {
  const axiosSecure = useAxiosSecure();
  return useQuery({
    queryKey: ['productReviews', productId],
    enabled: !!productId,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/reviews/product/${productId}`);
      return data;
    },
  });
};

export const useAddReview = () => {
  const axiosSecure = useAxiosSecure();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async payload => {
      const { data } = await axiosSecure.post('/reviews', payload);
      return data;
    },
    onSuccess: (_, variables) => {
      qc.invalidateQueries(['latestReviews']);
      if (variables.productId)
        qc.invalidateQueries(['productReviews', variables.productId]);
    },
  });
};

// Get user's own reviews
export const useUserReviews = email => {
  const axiosSecure = useAxiosSecure();
  return useQuery({
    queryKey: ['userReviews', email],
    enabled: !!email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/reviews/user/${email}`);
      return data;
    },
  });
};

// Delete review
export const useDeleteReview = () => {
  const axiosSecure = useAxiosSecure();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async id => {
      const { data } = await axiosSecure.delete(`/reviews/${id}`);
      return data;
    },
    onSuccess: (_, variables) => {
      qc.invalidateQueries(['userReviews']);
    },
  });
};
