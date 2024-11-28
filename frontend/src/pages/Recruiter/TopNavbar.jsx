import React from "react";
import "../../css/RTopNavbar.css";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import orangelogo from "../../assets/orangelogo.png"

const TopNavbar = () => {
    return (
        <div className="top-navbar">
            <div className="logo">
                <img src={orangelogo} alt="JobSphere Logo"
                    style={{ width: 90, height: 90 }} />
                <span style={{ fontWeight: 600, fontSize: 25, color: "white" }}>JobSphere</span>
            </div>
            <div className="nav-links">
                <a href="#find-jobs">Find Jobs</a>
                <a href="#company">Company</a>
                <a href="#contact">Contact</a>
                <div className="nav-icons">
                    <NotificationsIcon className="icon" />
                    <AccountCircleIcon className="icon" />
                </div>
            </div>
        </div>
    );
};

export default TopNavbar;