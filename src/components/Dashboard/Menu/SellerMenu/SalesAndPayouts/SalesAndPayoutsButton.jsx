import { useState } from 'react';
import NavButton from '../../../../shared/Buttons/NavButton';
import SalesAndPayoutDropdown from './SalesAndPayoutDropdown';

const SalesAndPayoutsButton = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(prev => !prev)
    }

    return (
        <>
        {/* Sales And Payout Button --------------------- */}
         <div onClick={toggleMenu} className='relative'>
            <NavButton
                label="Sales & Payouts"
            />
        </div> 

        {/* Sales and Payout Dropdown -------------------- */}
        <div className='absolute top-0 -right-2'>
            {
                isMenuOpen && (
                    <SalesAndPayoutDropdown/>
                )
            }
        </div>  
        </>
    );
};

export default SalesAndPayoutsButton;