import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
    const navigate = useNavigate();

    const login = async (email, password) => {
        try {
            const res = await axios.post("http://localhost:4000/api/auth/login", { email, password });
            const { token } = res.data;
            localStorage.setItem("user", JSON.stringify({ token, email }));
            setUser({ token, email });
            navigate("/calendar");
        } catch (error) {
            console.error("Login failed", error.response?.data || error.message);
        }
    };

    const logout = () => {
        localStorage.removeItem("user");
        setUser(null);
        navigate("/login");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};