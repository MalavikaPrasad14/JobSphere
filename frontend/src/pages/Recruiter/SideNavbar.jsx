import "../../css/RSideNavbar.css";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import WorkIcon from "@mui/icons-material/Work";
import MailIcon from "@mui/icons-material/Mail";
import StarIcon from "@mui/icons-material/Star";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpIcon from "@mui/icons-material/Help";
import LogoutIcon from "@mui/icons-material/Logout";

const SideNavbar = () => {
  return (
    <div className="side-navbar">
      <ul className="menu-list">
        {/* <li className="menu-item">
          <HomeIcon className="menu-icon" /> Get Started
        </li> */}
        <li className="menu-item">
          <PersonIcon className="menu-icon" />Profile 
        </li>
        <li className="menu-item">
          <WorkIcon className="menu-icon" /> Posted Jobs
        </li>
        <li className="menu-item">
          <MailIcon className="menu-icon" /> Applications
        </li>
        <li className="menu-item">
          <StarIcon className="menu-icon" /> Shortlists
        </li>
      </ul>
      <div className="bottom-links">
        <a href="#settings">
          <SettingsIcon className="menu-icon" /> Settings
        </a>
        <a href="#help">
          <HelpIcon className="menu-icon" /> Help
        </a>
        <a href="/login">
          <LogoutIcon className="menu-icon" /> Log Out
        </a>
      </div>
    </div>
  );
};

export default SideNavbar;