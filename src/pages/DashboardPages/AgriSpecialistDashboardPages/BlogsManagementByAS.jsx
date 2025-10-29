import React from 'react'
import { useTheme } from '../../../hooks/useTheme';
import Container from '../../../components/shared/Container';

const BlogsManagementByAS = () => {
    const {theme} = useTheme();
   const themeBackground = theme === 'dark' ? "bg-dark" : "bg-light";
   const themeForeground = theme === 'dark' ? "fg-dark" : "fg-light";
    return (
    <div className={`${themeBackground} min-h-screen`}>
        <Container>
            this is blogs management page
        </Container>
    </div>
  )
}

export default BlogsManagementByAS;