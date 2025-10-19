import useAuth from "../../../hooks/useAuth";

const UserPhoto = () => {
    const {user} = useAuth();
  return (
    <>
      <div className="w-14 h-14 mt-18 md:mt-4 rounded-full overflow-hidden ring ring-blue-500 hover:ring-blue-700 hover:shadow-md hover:scale-104">
        <img
          src={user?.photoURL}
          className="w-full h-full object-cover"
          title={user?.displayName}
        />
      </div>
    </>
  );
};

export default UserPhoto;
