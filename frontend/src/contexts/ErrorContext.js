import React, { createContext, useContext, useState } from "react";

const ErrorContext = createContext();

export const ErrorProvider = ({ children }) => {
    const [error, setError] = useState("");

    const showError = (message) => {
        setError(message);
        setTimeout(() => setError(""), 7000); // Clears error after 3 sec
    };

    return (
        <ErrorContext.Provider value={{ error, showError }}>
            {children}
        </ErrorContext.Provider>
    );
};

export const useError = () => {
    return useContext(ErrorContext);
};
