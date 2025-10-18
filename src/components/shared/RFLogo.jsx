import { Link } from "react-router";
import logo from "../../assets/Logo/Rootfarming.png";

const RFLogo = () => {
  return (
    <>
      <Link to="/">
        <div className="flex items-center justify-center gap-2 text-md md:text-lg lg:text-xl font-bold text-white">
          <img src={logo} className="w-8 h-8 rounded-full" />
          Root Farming
        </div>
      </Link>
    </>
  );
};

export default RFLogo;
