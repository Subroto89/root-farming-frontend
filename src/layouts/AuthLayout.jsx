import { Link, Outlet } from "react-router";
// import LeafButton from "../components/shared/Buttons/LeafButton.jsx"


const AuthLayout = () => {
  return (
    <div>
      <div className="relative flex flex-col md:flex-row items-center gap-10 min-h-screen w-full bg-[url(../../src/assets/loginBg.jpeg)] bg-gray-700 bg-cover bg-center bg-no-repeat">
        {/*  black overlay */}
        <div className="absolute inset-0 bg-black/60 z-0 pointer-events-none"></div>

        {/* ---------------------------------------
                     Left Half Section
             ----------------------------------- */}
        <div
          className="flex-1 order-first md:order-none hidden md:flex text-white p-8 md:p-12 lg:p-16 rounded-lg 
                     flex-col justify-center items-center text-center min-h-screen relative z-10"
        >
          <div className="text-6xl font-extrabold mb-1 leading-tight drop-shadow-lg">
            Welcome To
          </div>
          <div className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-wider drop-shadow-lg">
            Root Farming
          </div>
          <p className="text-gray-300 mt-4 mb-4 max-w-sm text-2xl">
            For a Better Farming Future.
            <br /> Think, Grow, and Sustain with Us!
          </p>
          <Link to="/">
            {/* <LeafButton></LeafButton> */}
          </Link>
        </div>

        {/* ---------------------------------------
                    Right Half - Outlet Section
            ----------------------------------- */}
        <div className="flex-1 relative z-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
