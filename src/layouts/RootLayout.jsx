import { Outlet } from "react-router";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";

const RootLayout = () => {
   return (
      <>
         <div>
            <nav className="fixed top-0 left-0 w-full z-50">
               <Navbar />
            </nav>
            <main className="min-h-[calc(100vh-40px)]">
               <Outlet>{/* Dynamic Pages Goes Here */}</Outlet>
            </main>
            <footer className="bg-gray-900 text-white">
               <Footer />
            </footer>
         </div>
      </>
   );
};

export default RootLayout;
