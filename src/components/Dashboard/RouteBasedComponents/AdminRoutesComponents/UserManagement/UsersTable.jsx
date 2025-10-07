import { GrUpdate } from "react-icons/gr";
import UserInfoRow from "./UserInfoRow";


const UsersTable = ({ users, refetch, setRole, setUserEmail, handleUpdateRoleModal }) => {
  return (
    <>
      <div className="w-full max-h-[calc(100vh-120px)] overflow-auto rounded-lg shadow-lg">
        <table className="min-w-full divide-y divide-gray-500 ">
          <thead className={` shadow-lg text-sm sticky top-0 bg-gradient-to-b from-green-900 to-green-200 text-gray-200 }`}>
            <tr>
              <th
                scope="col"
                className="font-bold uppercase text-left px-5 py-2"
              >
                Name
              </th>
              <th
                scope="col"
                className="font-bold uppercase text-left px-5 py-2"
              >
                Email
              </th>
              <th
                scope="col"
                className="font-bold uppercase text-left px-5 py-2"
              >
                Role
              </th>
              <th
                scope="col"
                className="font-bold uppercase text-left px-5 py-2"
              >
                Status
              </th>
              <th
                scope="col"
                className="font-bold uppercase flex items-center justify-center  gap-3 px-5 py-2"
              >
                <GrUpdate size={18} />
                Action
              </th>
            </tr>
          </thead>
          <tbody className={`bg-white divide-y divide-gray-200 `}>
            {users.map((user) => (
              <UserInfoRow
                key={user._id}
                user={user}
                refetch={refetch}
                setRole={setRole}
                setUserEmail={setUserEmail}
                handleUpdateRoleModal={handleUpdateRoleModal}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UsersTable;
