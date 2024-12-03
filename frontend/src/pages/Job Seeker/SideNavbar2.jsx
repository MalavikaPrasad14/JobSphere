import React from "react";
import "../../css/SideNavbar.css";
import {
  Home as HomeIcon,
  AccountCircle as AccountIcon,
  Work as WorkIcon,
  Star as StarIcon,
  Settings as SettingsIcon,
  Help as HelpIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material"; // Importing the icons

const SideNavbar2 = () => {
  return (
    <div className="side-navbar2">
      <ul className="menu-list">
        <li className="menu-item">
          <HomeIcon sx={{ marginRight: 1 }} /> Get Started
        </li>
        <li className="menu-item">
          <AccountIcon sx={{ marginRight: 1 }} /> My Profile
        </li>
        <li className="menu-item">
          <WorkIcon sx={{ marginRight: 1 }} /> Applied Jobs
        </li>
        <li className="menu-item">
          <StarIcon sx={{ marginRight: 1 }} /> Shortlisted
        </li>
        {/* <li className="menu-item">
          <TeamIcon sx={{ marginRight: 1 }} /> Team
        </li> */}
      </ul>
      <div className="bottom-links">
        <a href="#settings">
          <SettingsIcon sx={{ marginRight: 1 }} /> Settings
        </a>
        <a href="#help">
          <HelpIcon sx={{ marginRight: 1 }} /> Help
        </a>
        <a href="#logout">
          <LogoutIcon sx={{ marginRight: 1 }} /> Log Out
        </a>
      </div>
    </div>
  );
};

export default SideNavbar2;
