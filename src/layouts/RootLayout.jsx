import { Outlet } from 'react-router';
import Navbar from '../components/shared/Navbar';
import Footer from '../components/shared/Footer';

const RootLayout = () => {
    return (
        <>
            <div>
                <nav>
                    <Navbar/>
                </nav>
                <main className='min-h-[calc(100vh-40px)]'>
                    <Outlet>
                        {/* Dynamic Pages Goes Here */}
                    </Outlet>
                </main>
                <footer>
                    <Footer/>
                </footer>
            </div>
        </>
    );
};

export default RootLayout;