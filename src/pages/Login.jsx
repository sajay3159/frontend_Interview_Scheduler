import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { TextField, Button, Container, Typography, Link, Box, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(email, password);
    };

    return (
        <Container maxWidth="sm">
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <Paper elevation={3} sx={{ padding: 4, width: "100%", maxWidth: 400, textAlign: "center" }}>
                    <Typography variant="h5" gutterBottom>HR Login</Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField 
                            fullWidth 
                            label="Email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            margin="normal" 
                            variant="outlined"
                        />
                        <TextField 
                            fullWidth 
                            type="password" 
                            label="Password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            margin="normal" 
                            variant="outlined"
                        />
                        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                            Login
                        </Button>
                    </form>
                    <Typography sx={{ mt: 2 }}>
                        Don't have an account?{" "}
                        <Link href="#" onClick={() => navigate("/register")}>Register here</Link>
                    </Typography>
                </Paper>
            </Box>
        </Container>
    );
};

export default Login;
