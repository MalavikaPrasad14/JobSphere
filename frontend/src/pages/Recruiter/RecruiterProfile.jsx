import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import TopNavbar from "../Recruiter/TopNavbar"; // Top Navbar component
import SideNavbar from "../Recruiter/SideNavbar"; // Side Navbar component
import "../../css/RecruiterProfile.css"; // Custom styles
import { useNavigate } from "react-router-dom";

const RecruiterProfile = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    contactNumber: "",
    address: "",
    aboutCompany: "",
    companyType: [],
    socialMedia: {
      instagram: "",
      facebook: "",
      twitter: "",
    },
    website: "",
    logo: null,
    banner: null,
  });

  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1); // State to track form step

  const companyTypes = [
    "IT & Software",
    "Construction",
    "Healthcare",
    "Education",
    "Marketing",
    "Finance",
    "Consulting",
    "Retail",
    "Manufacturing",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCompanyTypeChange = (event) => {
    const {
      target: { value },
    } = event;
    setFormData({
      ...formData,
      companyType: typeof value === "string" ? value.split(",") : value,
    });
  };

  const handleSocialMediaChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      socialMedia: {
        ...formData.socialMedia,
        [name]: value,
      },
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0], // Save the uploaded file
    });
  };

  const validateStepOne = () => {
    const newErrors = {};
    if (!formData.companyName) newErrors.companyName = "Company name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Invalid email format";
    if (!formData.contactNumber) newErrors.contactNumber = "Contact number is required";
    if (!/^\d{10}$/.test(formData.contactNumber))
      newErrors.contactNumber = "Enter a valid contact number (10 digits)";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.aboutCompany) newErrors.aboutCompany = "Company description is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStepTwo = () => {
    const newErrors = {};
    if (formData.companyType.length === 0)
      newErrors.companyType = "Select at least one company type";
    if (!formData.website) newErrors.website = "Website link is required";
    if (!/^https?:\/\/\S+$/.test(formData.website))
      newErrors.website = "Enter a valid URL (e.g., https://example.com)";
    if (!formData.logo) newErrors.logo = "Company logo is required";
    if (!formData.banner) newErrors.banner = "Company banner is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStepOne()) {
      setStep(2);
      setErrors({});
    }
  };

  const handleBack = () => {
    setStep(1);
  };
 const navigate=useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStepTwo()) {
      console.log("Form Data Submitted:", formData);
      alert("Profile saved successfully!");
      navigate("/recruiter/profile");
    } else {
      alert("Please fix the errors in the form.");
    }
  };

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
          >
            {step === 1 && (
              <>
                <div className="form-row">
                  <TextField
                    label="Company Name"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    error={!!errors.companyName}
                    helperText={errors.companyName}
                    required
                  />
                  <TextField
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={!!errors.email}
                    helperText={errors.email}
                    required
                  />
                </div>
                <div className="form-row">
                  <TextField
                    label="Contact Number"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    error={!!errors.contactNumber}
                    helperText={errors.contactNumber}
                    required
                  />
                  <TextField
                    label="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    error={!!errors.address}
                    helperText={errors.address}
                    required
                  />
                </div>
                <TextField
                  label="About Company"
                  name="aboutCompany"
                  multiline
                  rows={4}
                  value={formData.aboutCompany}
                  onChange={handleChange}
                  error={!!errors.aboutCompany}
                  helperText={errors.aboutCompany}
                  required
                />
                <div style={{ display: "flex", justifyContent: "center", marginTop: "16px" }}>
                <Button
                  variant="contained"
                  color="primary"
                  
                  onClick={handleNext}
                >
                  Next
                </Button>
                </div>
              </>
            )}
            {step === 2 && (
              <>
                <FormControl sx={{ m: 1, width: "100%" }}>
                  <InputLabel id="company-type-label">Company Type</InputLabel>
                  <Select
                    labelId="company-type-label"
                    id="company-type"
                    multiple
                    value={formData.companyType}
                    required
                    onChange={handleCompanyTypeChange}
                    renderValue={(selected) => (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    )}
                  >
                    {companyTypes.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.companyType && (
                    <p className="error-text">{errors.companyType}</p>
                  )}
                </FormControl>
                <h4>Company Logo</h4>
                <input
                  accept="image/*"
                  type="file"
                  name="logo"
                  onChange={handleFileChange}
                  className="file-input"
                />
                {errors.logo && <p className="error-text">{errors.logo}</p>}
                <h4>Company Banner</h4>
                <input
                  accept="image/*"
                  type="file"
                  name="banner"
                  onChange={handleFileChange}
                  className="file-input"
                />
                {errors.banner && <p className="error-text">{errors.banner}</p>}
                <h4>Social Media Links</h4>
                <div className="form-row">
                  <TextField
                    label="Website Link"
                    name="website"
                    type="url"
                    value={formData.website}
                    onChange={handleChange}
                    error={!!errors.website}
                    helperText={errors.website}
                    required
                  />
                  <TextField
                    label="Instagram"
                    name="instagram"
                    value={formData.socialMedia.instagram}
                    onChange={handleSocialMediaChange}
                  />
                </div>
                <div className="form-row">
                  <TextField
                    label="Facebook"
                    name="facebook"
                    value={formData.socialMedia.facebook}
                    onChange={handleSocialMediaChange}
                  />
                  <TextField
                    label="Twitter"
                    name="twitter"
                    value={formData.socialMedia.twitter}
                    onChange={handleSocialMediaChange}
                  />
                </div><br />
                <div className="form-row" style={{ display: "flex", justifyContent: "center", gap: "16px", marginTop: "16px" }}>
                  <Button
                  className="button"
                    variant="outlined"
                    color="primary"
              
                    onClick={handleBack}
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    
                    onClick={handleSubmit}
                  >
                    Save
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
