import { useQuery } from '@tanstack/react-query';

import useAuth from './useAuth';
import useAxiosSecure from './UseAxiosSecure';

const useUserRole = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();

  const {
    data: role = null,
    isLoading: isRoleLoading,
    refetch,
  } = useQuery({
    queryKey: ['userRole', user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role?email=${user.email}`);
      return res.data.role;
    },
  });

  return [role, isRoleLoading, refetch];
};

export default useUserRole;
