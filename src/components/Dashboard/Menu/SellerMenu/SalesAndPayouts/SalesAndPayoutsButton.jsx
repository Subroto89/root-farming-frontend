import { useState } from 'react';
import SalesAndPayoutDropdown from './SalesAndPayoutDropdown';
import { ChevronDown, ChevronRight, Receipt } from 'lucide-react';
import Button from '../../../../shared/Buttons/Button';

const SalesAndPayoutsButton = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(prev => !prev)
    }

    return (
        <>
        {/* Sales And Payout Button --------------------- */}
         <div onClick={toggleMenu} className="w-60 flex justify-between items-center space-x-1">
            <Button
                label="Sales & Payouts"
                icon={ Receipt }
            />
             {!isMenuOpen ? <ChevronRight size={18}/> : <ChevronDown size={18}/>}
        </div> 

        {/* Sales and Payout Dropdown -------------------- */}
        <div>
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