import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, TextField, Button, Typography } from "@mui/material";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:4000/api/auth/register", { email, password });
            navigate("/login"); 
        } catch (error) {
            setError(error.response?.data?.message || "Registration failed");
        }
    };

    return (
        <Container maxWidth="xs">
            <Typography variant="h5" align="center">HR Registration</Typography>
            {error && <Typography color="error">{error}</Typography>}
            <form onSubmit={handleSubmit}>
                <TextField fullWidth label="Email" value={email} onChange={(e) => setEmail(e.target.value)} margin="normal" required />
                <TextField fullWidth type="password" label="Password" value={password} onChange={(e) => setPassword(e.target.value)} margin="normal" required />
                <Button type="submit" variant="contained" color="primary" fullWidth>Register</Button>
            </form>
        </Container>
    );
};

export default Register;
