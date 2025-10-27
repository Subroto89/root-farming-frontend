import { useTheme } from "../../../../../hooks/useTheme";
import { capitalizeFirstLetter } from "../../../../../utils/utilities";


const UserInfoRow = ({ user, setRole, setUserEmail, handleUpdateRoleModal }) => {
 const { theme } = useTheme();
  const themeBackgroundStyle = theme === "dark" ? "bg-dark" : "bg-light";
  const themeForegroundStyle = theme === "dark" ? "fg-dark" : "fg-light";
  const themeFgOfFgStyle = theme === "dark" ? "fg-of-fg-dark" : "fg-of-fg-light";

  const { _id, userName, userEmail, userRole, status } = user;

  return (
    <tr className={`${themeForegroundStyle} min-w-full text-sm font-semibold hover:bg-blue-50 transition-color duration-300`}>
      <td className="px-5 py-2 w-86">{userName}</td>
      <td className="px-5 py-2 w-86">{userEmail}</td>
      <td className="px-5 py-2 w-50 text-left">{capitalizeFirstLetter(userRole)}</td>
      <td className="px-5 py-2 w-96 text-left">{capitalizeFirstLetter(status)}</td>
      <td className="px-5 py-2 w-50 text-center">
        <button
          className="btn btn-outline text-xs hover:bg-green-600 hover:text-white rounded-md"
          onClick={() => {
            setRole(userRole), handleUpdateRoleModal(), setUserEmail(userEmail);
          }}
        >
          Update Role
        </button>
      </td>
    </tr>
  );
};

export default UserInfoRow;