import React from "react";
import "../../css/RProfile.css"; // Include responsive styles
import TopNavbar from "../Recruiter/TopNavbar";
import SideNavbar from "../Recruiter/SideNavbar";

const RProfile = () => {
  const handleEditClick = () => {
    alert("Edit profile functionality to be implemented!");
  };

  return (
    <div className="recruiter-profile">
      {/* Top Navbar */}
      <TopNavbar />
      
      {/* Main Content Section */}
      <div className="main-container">
        {/* Sidebar */}
        <SideNavbar />

        {/* Profile Section */}
        <div className="profile">
          {/* Banner */}
          <div className="banner">
            <img
              src="/Images/welcomebg.jpg"
              alt="Company Banner"
              className="banner-image"
            />
            <div className="logo-container">
              <img
                src="/Images/orangelogo2.png"
                alt="Company Logo"
                className="logo-image"
              />
            </div>
            <button
              href="/recruiter"
              className="edit-button"
              onClick={handleEditClick}
            >
              ✏️ Edit Profile
            </button>
          </div>

          {/* Profile Content */}
          <div className="profile-details">
            {/* About Section */}
            <div className="about">
              <h1>Nike</h1>
              <p>Company Motto: "Just Do It"</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam.
              </p>
            </div>

            {/* Contact Section */}
            <div className="contact">
              <h2>Contact Us</h2>
              <p>📞 +977-9812345678</p>
              <p>📍 Setopool-10, Maitidevi, Kathmandu, Nepal</p>
              <p>📧 info@gorillaeducation.com</p>
              <p>
                🌐{" "}
                <a href="https://www.companywebsite.com">
                  www.companywebsite.com
                </a>
              </p>
              <div className="social-media">
                <a href="#">Instagram</a>
                <a href="#">Facebook</a>
                <a href="#">Twitter</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RProfile;