import { useState } from "react";
import useAxiosSecure from "../../../../hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";

import { TabTitle } from "../../../../utils/utilities";
import UpdateRoleModal from "../../../../components/Dashboard/RouteBasedComponents/AdminRoutesComponents/UserManagement/UpdateRoleModal";
import LoadingSpinner from "../../../../components/shared/LoadingSpinner";
import DataNotFound from "../../../../components/shared/DataNotFound";
import UsersTable from "../../../../components/Dashboard/RouteBasedComponents/AdminRoutesComponents/UserManagement/UsersTable";
import Container from "../../../../components/shared/Container";

const ManageFarmers = () => {
  TabTitle("Manage Farmers");
  const axiosSecure = useAxiosSecure();
  const [isUpdateRoleModal, setIsUpdateRoleModal] = useState(false);
  const [role, setRole] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const {
    data: users = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["farmers"],
    queryFn: async () => {
      // const { data } = await axiosSecure.get("/users/get-farmers");
      const { data } = await axiosSecure.get(
        "/users/get-users-by-type?type=farmer"
      );
      return data;
    },
  });

  const handleUpdateRoleModal = () => {
    setIsUpdateRoleModal((prev) => !prev);
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      <Container>
        <div>
          {/* Title Section ----------------------------*/}
          <div>
            <h2 className="text-2xl font-bold text-center mb-6">Manage Farmers</h2>
          </div>
          {/* Farmers List ----------------------------- */}
          <div>
            {users.length > 0 ? (
              <div>
                <UsersTable
                  users={users}
                  refetch={refetch}
                  setRole={setRole}
                  setUserEmail={setUserEmail}
                  handleUpdateRoleModal={handleUpdateRoleModal}
                />
              </div>
            ) : (
              <div>
                <DataNotFound />
              </div>
            )}
          </div>
          {/* Role Update Modal Section ----------------- */}
          <div>
            {isUpdateRoleModal && (
              <UpdateRoleModal
                handleUpdateRoleModal={handleUpdateRoleModal}
                role={role}
                setRole={setRole}
                userEmail={userEmail}
                refetch={refetch}
              />
            )}
          </div>
        </div>
      </Container>
    </>
  );
};

export default ManageFarmers;
