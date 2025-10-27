import { useNavigate } from "react-router";
import {useAuth} from "../../../hooks/useAuth";
import { LogOut } from "lucide-react";

const LogoutButton = () => {
  const { logOutUser } = useAuth();
  const navigate = useNavigate();
  return (
    <>
      <button
        onClick={() => {
          logOutUser(), navigate("/");
        }}
        className="flex items-center gap-2 border border-gray-400 rounded-md px-2 hover:bg-green-500 hover:text-white cursor-pointer"
      >
        Logout <LogOut size={16}/>
      </button>
    </>
  );
};

export default LogoutButton;
