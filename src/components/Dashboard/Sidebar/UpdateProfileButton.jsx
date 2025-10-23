import { UserRoundPen } from "lucide-react";
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";

const UpdateProfileButton = () => {
    const {user} = useAuth();

  return (
    <>
      <Link
        to={`/dashboard/update-profile/${user?.email}`}
        className="flex items-center justify-center gap-4 py-1 border-t border-b border-gray-400 hover:bg-green-500 hover:text-white cursor-pointer w-full mb-3  "
      >
        <UserRoundPen />
        Update Profile
      </Link>
    </>
  );
};

export default UpdateProfileButton;
