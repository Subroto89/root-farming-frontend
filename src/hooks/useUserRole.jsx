import {useAuth} from './useAuth';
import useAxiosSecure from './UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useUserRole = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();

  const {
    data: role,
    isLoading: isRoleLoading,
    refetch,
  } = useQuery({
    queryKey: ['userRole', user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const {data} = await axiosSecure.get(`/users/get-user-role/${user.email}`);
      return data.role;
    },
  });

  return { userRole: role, userRoleLoading: isRoleLoading, refetchUserRole: refetch };
};

export default useUserRole;
