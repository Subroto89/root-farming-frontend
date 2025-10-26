import React, { useState } from 'react';
import Button from '../../../components/shared/Buttons/Button';
import { useTheme } from '../../../hooks/useTheme';
import Container from '../../../components/shared/Container';
import ModalFormat from '../../../components/shared/ModalFormat';

const AgriSpecialistDashboardHome = () => {
    const {theme} = useTheme();
    const [isModal, setIsModal] = useState(false);
    const handleModal = () => {
        setIsModal(prev => !prev);
    }
   
    
   const themeBackgroundStyle = theme === 'dark' ? "bg-dark" : "bg-light";
    const themeForegroundStyle = theme === 'dark' ? "fg-dark" : "fg-light";
    const themeFgOfFgStyle = theme === 'dark' ? "fg-of-fg-dark" : "fg-of-fg-light"

    return (
        <div className={`${themeBackgroundStyle}`}>
            <Container>
                <div className='flex items-center justify-between'>
                <h2>My heading here</h2>
                <Button
                    label="My Button"
                    status="danger"
                    onClick={handleModal}
                />

                {
                    isModal && (
                        <ModalFormat
                    width="w-[800px]"
                    height="h-[500px]"
                    headerText="My Modal"
                    modalClosingFunction={handleModal}
                    form=""
                />

                    )
                }
            </div>
            </Container>
        </div>
    );
};

export default AgriSpecialistDashboardHome;