import { Outlet } from 'react-router';
import Footer from '../components/shared/Footer';
import Navbar from '../components/NavbarComponents/Navbar';

const RootLayout = () => {
  return (
    <>
      <div>
        <nav className="sticky top-0 z-100">
          <Navbar />
        </nav>
        <main className="min-h-[calc(100vh-40px)]">
          <Outlet>{/* Dynamic Pages Goes Here */}</Outlet>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default RootLayout;
