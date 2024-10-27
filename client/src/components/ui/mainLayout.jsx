import React from "react";

const MainLayout = ({ children, bgColor = "bg-primary-darker" }) => {
    return (
        <div className={`fixed inset-0 ${bgColor} text-primary p-4`}>
            {children}
        </div>
    );
};

export default MainLayout;