import NavButton2 from "../NavButton2";

const LanguageDropdown = () => {
    return (
        <>
         <div className="flex flex-col rounded-lg p-2 bg-gray-200 overflow-y-scroll max-h-28">
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