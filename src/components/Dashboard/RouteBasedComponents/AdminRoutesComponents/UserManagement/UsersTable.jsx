import { GrUpdate } from "react-icons/gr";
import UserInfoRow from "./UserInfoRow";
import { useTheme } from "../../../../../hooks/useTheme";


const UsersTable = ({ users, refetch, setRole, setUserEmail, handleUpdateRoleModal }) => {
  const { theme } = useTheme();
    const themeBackgroundStyle = theme === "dark" ? "bg-dark" : "bg-light";
    const themeForegroundStyle = theme === "dark" ? "fg-dark" : "fg-light";
    const themeFgOfFgStyle = theme === "dark" ? "fg-of-fg-dark" : "fg-of-fg-light";
  return (
    <>
      <div className={`${themeForegroundStyle} w-full max-h-[calc(100vh-110px)] overflow-scroll rounded-lg shadow-lg`}>
        <table className={`${themeForegroundStyle} overflow-hidden min-w-full divide-y divide-gray-500 `}>
          <thead className={`${themeForegroundStyle} shadow-lg text-sm sticky top-0  }`}>
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
                className="font-bold uppercase flex items-center justify-center gap-3 px-5 py-2"
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
