// import Logo from "../components/shared/Logo";
import { Link, Outlet } from "react-router";
import authBackground from "../../src/assets/AuthBackground.jpg"

const AuthLayout = () => {
  return (
    <div>
      <div
        style={{ backgroundImage: `url(${authBackground})` }}
        className="relative flex flex-col md:flex-row items-center gap-10 bg-gray-700 min-h-screen bg-cover bg-center bg-no-repeat w-full"
      >
        {/* ---------------------------------------
                     Left Half Section
             ----------------------------------- */}

        <div
          className="flex-1 order-first md:order-none hidden md:flex text-white p-8 md:p-12 lg:p-16 rounded-lg shadow-2xl 
                     flex-col justify-center items-center text-center min-h-screen"
        >
          <div className="text-6xl font-extrabold mb-1 leading-tight drop-shadow-lg">
            Welcome To
          </div>
          <div className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-wider drop-shadow-lg">
            Root Farming
          </div>
          <p className="text-white text-opacity-80 mt-4 max-w-sm text-2xl">
            For a Better Farming Future.<br/> Think, Grow, and Sustain with Us!
          </p>
          <Link to="/">
            <p className="btn btn-outline border border-white px-3 py-1 rounded-lg mt-3 hover:bg-green-200 hover:text-blue-600">Take Me Home</p>
          </Link>
        </div>
        {/* ---------------------------------------
                    Right Half- Outlet Section
            ----------------------------------- */}
        <div className="flex-1">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

