import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../css/RProfile.css"; // Include responsive styles
import TopNavbar from "../pages/Recruiter/TopNavbar";
import SideNavbar from "../pages/Recruiter/SideNavbar";

const ViewProfile = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('access_token');
    const navigate = useNavigate();
    useEffect(() => {
        
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/profile', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                setUserData(response.data);
            } catch (error) {
                console.error("Error fetching profile data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, [token]);
    // const handleLogout = () => {
    //     localStorage.removeItem('token');
    //     navigate('/login');
    //   };
     
      const  handleEditClick = (userData) => {
        navigate('/recruiter', { state: { userData} });
      };
    
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
       
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
                onClick={() => handleEditClick(userData)}
              >
                ✏️ Edit Profile
              </button>
            </div>
  
            {/* Profile Content */}
            <div className="profile-details">
              {/* About Section */}
              <div className="about">
                <h1>{userData.fullname}</h1>
                <p>Role: {userData.role}</p>
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
                <p>📞 {userData.phoneNumber}</p>
                <p>📍 Setopool-10, Maitidevi, Kathmandu, Nepal</p>
                <p>📧 {userData.email}</p>
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
      </>
    );
};

export default ViewProfile;
