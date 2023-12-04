import React from "react";
import { AppBar, Toolbar, Button } from "@mui/material";
import { getAuth, signOut } from "firebase/auth";
import { styled } from "@mui/system";
import { useLocation, useNavigate } from "react-router-dom";

const logoUrl = "/HH_Logo.png";

const HeaderLogo = styled("img")({
    height: "40px",
    marginRight: (theme) => theme.spacing(2),
});

const NavButton = ({ to, label }) => {
    const location  = useLocation();
    const className = location.pathname === to ? "toolbarCurrent" : "toolbarOther";
    const navigate  = useNavigate();
    return (
        <Button className={className} onClick={() => navigate(to)}>
            {label}
        </Button>
    );
}

export default function AppToolbar({ user }) {
    const handleLogout = () => {
        signOut(getAuth());
    };

    return (
        <AppBar position="static" color="transparent">
            <Toolbar>
                <HeaderLogo src={logoUrl} alt="Health Horizon AI Logo" />
                <NavButton to="/" label="Home" />
                <NavButton to="/about" label="About" />
                {user && <NavButton to="/profile" label="Profile" />}
                <NavButton
                    to={user ? "/chatbot" : "/login"}
                    label={user ? "Chatbot" : "Login"}
                />
                <NavButton to="/contactus" label="Contact" />
                {user && (
                    <Button color="primary" onClick={handleLogout}>
                        Logout
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
}
