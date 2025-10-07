import React from 'react';

const Container = ({children}) => {
    return (
        <div className="px-6 py-8 md:py-4 ">
            {children}
        </div>
    );
};

export default Container;