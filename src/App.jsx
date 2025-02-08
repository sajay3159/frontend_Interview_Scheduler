import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Calendar from "./components/Calender";
import { useContext } from "react";

const PrivateRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    return user ? children : <Navigate to="/login" />;
};

function App() {
    return (
        <AuthProvider>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/calendar" element={<PrivateRoute><Calendar /></PrivateRoute>} />
                    <Route path="*" element={<Login />} />
                </Routes>
        </AuthProvider>
    );
}

export default App;
