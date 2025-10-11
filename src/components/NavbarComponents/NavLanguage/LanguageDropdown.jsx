import { useTheme } from "../../../hooks/useTheme";
import NavButton2 from "../../shared/Buttons/NavButton2";

const LanguageDropdown = () => {
    const {theme} = useTheme();
    const dropDownTheme = theme === 'dark' ? 'navbar-dark' : 'navbar-light';

    return (
        <>
         <div className={`${dropDownTheme} flex flex-col rounded-lg p-2 bg-gray-200 overflow-y-scroll max-h-28`}>
                <NavButton2 label="Bengali"/>
                <NavButton2 label="English"/>
                <NavButton2 label="Hindi"/>
                <NavButton2 label="French"/>
                <NavButton2 label="German"/>
                <NavButton2 label="Urdu"/>
        </div>           
        </>
    );
};

export default LanguageDropdown;