import React from 'react'
import { useTheme } from '../../../hooks/useTheme';
import Container from '../../../components/shared/Container';

const FarmersProfiles = () => {
const {theme} = useTheme();
const themeBackground = theme === 'dark' ? "bg-dark" : "bg-light";
const themeForeground = theme === 'dark' ? "fg-dark" : "fg-light";

return (
    <div className={`${themeBackground} min-h-screen`}>
        <Container>
            This is Farmers Profiles page
        </Container>
    </div>
  )
}

export default FarmersProfiles