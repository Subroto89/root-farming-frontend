import React from "react";
import { RiUserSettingsLine } from "react-icons/ri";
import useAxiosSecure from "../../../../../hooks/UseAxiosSecure";
import Swal from "sweetalert2";

const UpdateRoleModal = ({handleUpdateRoleModal, role, setRole, userEmail, refetch}) => {
  const axiosSecure = useAxiosSecure();

    const handleOnChange = (e) => {
        e.preventDefault();
        const selectedRole = e.target.value;
        setRole(selectedRole)

    }

    const handleUpdateRole = async () => {
      const {data} = await axiosSecure.patch(`/users/update-role/${userEmail}`, {role})
      refetch();
       if (data.modifiedCount === 1) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Role has been updated!",
        timer: 1500,
      });
      handleUpdateRoleModal();
    }
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-100 ">
        <div className="w-[400px] h-[200px] bg-gradient-to-b from-green-500 to-green-200 rounded-lg p-4 shadow-lg">
          <div className="flex items-center justify-center gap-2 text-2xl font-bold">
            <RiUserSettingsLine size={36}/>
          <h2> Update Role</h2>
          </div>

          <form>
            {/* Field For Role--------------------------------------------------------------- */}
            <select
              onChange={handleOnChange}
              defaultValue={role}
              className="w-full px-4 py-3 border border-gray-800 rounded-lg mt-8 mb-4 bg-green-200"
            >
              <option value="">Select a role</option>
              <option value="admin">Admin</option>
              <option value="farmer">Farmer</option>
              <option value="seller">Seller</option>
              <option value="customer">Customer</option>
              <option value="agri-specialist">Agri-Specialist</option>
            </select>
          </form>

          <div className="flex justify-center items-center gap-4">
            <button onClick={handleUpdateRoleModal} className="font-semibold border border-gray-400 rounded hover:bg-red-500 px-2 py-1">Cancel</button>
            <button onClick={handleUpdateRole} className="font-semibold border border-gray-400 rounded hover:bg-green-500 px-2 py-1">Update</button>
          </div>
        </div>
      </div>
    </>
  );
};



export default UpdateRoleModal;
