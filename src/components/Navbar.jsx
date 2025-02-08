import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>Interview Scheduler</Typography>
                {user && <Typography variant="subtitle1">Logged in as: {user.email}</Typography>}
                {user && <Button color="inherit" onClick={logout}>Logout</Button>}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;