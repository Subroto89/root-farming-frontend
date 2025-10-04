import { UserRoundPen } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

const UpdateProfileButton = () => {
    const {user} = useState();

  return (
    <>
      <Link
        to={`/update-profile/${user?.email}`}
        className="flex items-center justify-center gap-4 py-1 border-t border-b border-gray-400 hover:bg-green-500 hover:text-white cursor-pointer w-full mb-3  "
      >
        <UserRoundPen />
        Update Profile
      </Link>
    </>
  );
};

export default UpdateProfileButton;
