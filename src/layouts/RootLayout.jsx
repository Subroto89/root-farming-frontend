import { Outlet, useLocation } from "react-router";
import Footer from "../components/shared/Footer";
import Navbar from "../components/NavbarComponents/Navbar";
import { useEffect } from "react";

const RootLayout = () => {
  const {pathname}=useLocation()
  useEffect(()=>{
   window.scrollTo({ top: 0, behavior: "smooth" });
  },[pathname])

  return (
    <>
      <div>
        {/* <nav className="sticky top-0 z-100"><Navbar /></nav> */}
        <main className="relative min-h-[calc(100vh-40px)]">
          <div className="fixed w-full top-0 z-1000  ">
            <Navbar />
          </div>
          <div>
            <Outlet>{/* Dynamic Pages Goes Here */}</Outlet>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default RootLayout;
