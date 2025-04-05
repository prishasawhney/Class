import { createContext, useContext, useState, useEffect } from "react";

// Helper function to read cookies
const getCookie = (name) => {
    const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
    return match ? match[2] : "";
};

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [username, setUsername] = useState("");

    useEffect(() => {
        // Retrieve username from cookie when the app loads
        const storedUsername = getCookie("username");
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    const loginUser = (newUsername) => {
        setUsername(newUsername);
        document.cookie = `username=${newUsername}; path=/`; // Store in cookie
    };

    const logoutUser = () => {
        setUsername("");
        document.cookie = "username=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    };

    return (
        <AuthContext.Provider value={{ username, loginUser, logoutUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
