import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import TopNavbar from "../Recruiter/TopNavbar"; // Top Navbar component
import SideNavbar from "../Recruiter/SideNavbar"; // Side Navbar component
import "../../css/RecruiterProfile.css"; // Custom styles
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios"; // Ensure axios is imported

const RecruiterProfile = () => {
  const [userData, setUserData] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    address: "",
    about: "",
    instagram: "",
    facebook: "",
    twitter: "",
    website: "",
    avatar: null,
    banner: null,
  });

  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1); // Step for form navigation
  const token = localStorage.getItem("access_token");
  const navigate = useNavigate();
  const location = useLocation();

  // Function to update form values
  const fetchValue = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  // Function to handle file uploads
  const handleFileChange = (event) => {
    const { name, files } = event.target;
    setUserData({ ...userData, [name]: files[0] });
  };

  // Navigate between steps
  const handleNext = () => setStep(2);
  const handleBack = () => setStep(1);

  // Send data to server
  const sendData = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();

      // Append all user data to formData
      for (const key in userData) {
        formData.append(key, userData[key]);
      }

      const url = location.state != null ? "http://localhost:3000/api/edit" : "http://localhost:3000/api/add";
      const method = location.state != null ? "put" : "post";

      const response = await axios({
        method: method,
        url: url,
        data: formData,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert(`Profile ${method === "put" ? "updated" : "created"} successfully!`);
      navigate("/profile"); // Redirect to profile page
    } catch (error) {
      console.error("Error saving data:", error.response?.data || error.message);
      alert("Failed to save data. Please try again.");
    }
  };

  // Prefill form if editing
  useEffect(() => {
    if (location.state != null) {
      setUserData({
        fullname: location.state.userData.fullname,
        email: location.state.userData.email,
        phoneNumber: location.state.userData.phoneNumber,
        address: location.state.userData.address,
        about: location.state.userData.about,
        instagram: location.state.userData.instagram,
        facebook: location.state.userData.facebook,
        twitter: location.state.userData.twitter,
        website: location.state.userData.website,
        avatar: location.state.userData.avatar,
        banner: location.state.userData.banner,
      });
    }
  }, [location.state]);

  return (
    <div className="layout">
      <TopNavbar />
      <div className="content">
        <SideNavbar />
        <div className="form-wrapper">
          <h3 className="form-heading">Complete Your Profile</h3>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "98%" },
            }}
            noValidate
            autoComplete="off"
            className="profile-form"
            onSubmit={sendData}
          >
            {step === 1 && (
              <>
                <div className="form-row">
                  <TextField
                    label="Full Name"
                    name="fullname"
                    value={userData.fullname}
                    onChange={fetchValue}
                    error={!!errors.fullname}
                    helperText={errors.fullname}
                    required
                  />
                  <TextField
                    label="Email"
                    name="email"
                    type="email"
                    value={userData.email}
                    onChange={fetchValue}
                    error={!!errors.email}
                    helperText={errors.email}
                    required
                  />
                </div>
                <div className="form-row">
                  <TextField
                    label="Contact Number"
                    name="phoneNumber"
                    value={userData.phoneNumber}
                    onChange={fetchValue}
                    error={!!errors.phoneNumber}
                    helperText={errors.phoneNumber}
                    required
                  />
                  <TextField
                    label="Address"
                    name="address"
                    value={userData.address}
                    onChange={fetchValue}
                    error={!!errors.address}
                    helperText={errors.address}
                    required
                  />
                </div>
                <TextField
                  label="About Company"
                  name="about"
                  multiline
                  rows={4}
                  value={userData.about}
                  onChange={fetchValue}
                  error={!!errors.about}
                  helperText={errors.about}
                  required
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "16px",
                  }}
                >
                  <Button variant="contained" color="primary" onClick={handleNext}>
                    Next
                  </Button>
                </div>
              </>
            )}
            {step === 2 && (
              <>
                <h4>Social Media Links</h4>
                <div className="form-row">
                  <TextField
                    label="Website Link"
                    name="website"
                    type="url"
                    value={userData.website}
                    onChange={fetchValue}
                    error={!!errors.website}
                    helperText={errors.website}
                  />
                </div>
               
                <div className="form-row">
                  <TextField
                    label="Instagram"
                    name="instagram"
                    value={userData.instagram}
                    onChange={fetchValue}
                  />
                </div>
                <div className="form-row">
                  <TextField
                    label="Facebook"
                    name="facebook"
                    value={userData.facebook}
                    onChange={fetchValue}
                  />
                  <TextField
                    label="Twitter"
                    name="twitter"
                    value={userData.twitter}
                    onChange={fetchValue}
                  />
                </div>
                <div
                  className="form-row"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "16px",
                    marginTop: "16px",
                  }}
                >
                  <Button variant="outlined" color="primary" onClick={handleBack}>
                    Back
                  </Button>
                  <Button type="submit" variant="contained" color="primary">
                    {location.state != null ? "Update" : "Add"}
                  </Button>
                </div>
              </>
            )}
          </Box>
        </div>
      </div>
    </div>
  );
};

export default RecruiterProfile;
