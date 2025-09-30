import React from 'react';
import NavButton from '../../../../shared/Buttons/NavButton';

const ContentManagementButton = () => {
    return (
        <>
            {/* Content Management Button ------------------------------- */}
            <div className='relative'>

                <NavButton
                    label="Content Management Button"
                />
                
            </div> 

            {/* Content Management Dropdown ------------------------------ */}
            <div className='absolute top-0 -right-2'>
                
            </div>  
        </>
    );
};

export default ContentManagementButton;