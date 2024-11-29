
import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button"; // Updated styles
import TopNavbar from "../Recruiter/TopNavbar";
import SideNavbar from "../Recruiter/SideNavbar";
import MenuItem from "@mui/material/MenuItem";
import "../../css/UserProfile.css";

// Section for personal information
const PersonalInfoSection = ({ formData, handleChange, errors }) => (
  <div className="form-section">
    <h4>Personal Information</h4>
    <div className="form-row">
      <TextField
        label="First Name"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        error={!!errors.firstName}
        helperText={errors.firstName}
        required
        sx={{ width: "48%", marginRight: "4%" }}
      />
      <TextField
        label="Last Name"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        error={!!errors.lastName}
        helperText={errors.lastName}
        required
        sx={{ width: "48%" }}
      />
    </div>
    <div className="form-row">
      <TextField
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        error={!!errors.email}
        helperText={errors.email}
        required
        sx={{ width: "48%", marginRight: "4%" }}
      />
      <TextField
        label="Phone Number"
        name="phoneNumber"
        value={formData.phoneNumber}
        onChange={handleChange}
        error={!!errors.phoneNumber}
        helperText={errors.phoneNumber}
        required
        sx={{ width: "48%" }}
      />
    </div>
    <TextField
      label="Address"
      name="address"
      value={formData.address}
      onChange={handleChange}
      error={!!errors.address}
      helperText={errors.address}
      required
      sx={{ width: "100%", marginBottom: "16px" }}
    />
    <TextField
      label="Bio"
      name="bio"
      multiline
      rows={4}
      value={formData.bio}
      onChange={handleChange}
      sx={{ width: "100%", marginBottom: "16px" }}
    />
  </div>
);

// Section for education and skills

const EducationSkillsSection = ({ formData, handleChange }) => {
  const [skills, setSkills] = useState(formData.skills.split(",").filter(Boolean) || []);
  const [newSkill, setNewSkill] = useState("");

  // Sample options for dropdowns
  const collegeOptions = ["MG College of Engineering", "University of Kerala", "National Institute of Technology"];
  const courseOptions = ["Computer Science and Engineering", "Information Technology", "Electronics and Communication"];
  const yearOptions = ["2023", "2024", "2025", "2026"];

  const handleAddSkill = () => {
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
      setNewSkill("");
      handleChange({
        target: { name: "skills", value: skills.concat(newSkill).join(",") },
      });
    }
  };

  const handleSkillChange = (e) => {
    setNewSkill(e.target.value);
  };

  const handleRemoveSkill = (skillToRemove) => {
    const updatedSkills = skills.filter((skill) => skill !== skillToRemove);
    setSkills(updatedSkills);
    handleChange({
      target: { name: "skills", value: updatedSkills.join(",") },
    });
  };

  return (
    <div className="form-section">
      <h4>Education and Skills</h4>
      
      <TextField
        select
        label="College Name"
        name="collegeName"
        value={formData.collegeName}
        onChange={handleChange}
        sx={{ width: "100%", marginBottom: "16px" }}
      >
        {collegeOptions.map((college) => (
          <MenuItem key={college} value={college}>
            {college}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        select
        label="Course"
        name="course"
        value={formData.course}
        onChange={handleChange}
        sx={{ width: "100%", marginBottom: "16px" }}
      >
        {courseOptions.map((course) => (
          <MenuItem key={course} value={course}>
            {course}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        select
        label="Pass-out Year"
        name="passoutYear"
        value={formData.passoutYear}
        onChange={handleChange}
        sx={{ width: "100%", marginBottom: "16px" }}
      >
        {yearOptions.map((year) => (
          <MenuItem key={year} value={year}>
            {year}
          </MenuItem>
        ))}
      </TextField>

      <div className="skills-section">
        <TextField
          label="Add Skill"
          value={newSkill}
          onChange={handleSkillChange}
          sx={{ width: "80%", marginBottom: "16px" }}
        />
        <Button variant="contained" color="primary" onClick={handleAddSkill} sx={{ marginLeft: "8px" }}>
          Add
        </Button>
      </div>
      <br/>

      <div className="skills-list">
        {skills.map((skill, index) => (
          <div key={index} className="skill-item">
            <span>{skill}</span>
            <Button variant="text" color="error" onClick={() => handleRemoveSkill(skill)} sx={{ marginLeft: "8px" }}>
              Remove
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

// Section for file upload, GitHub, and LinkedIn links
const FileUploadSection = ({ handleFileChange, handleLinkChange, formData }) => (
  <div className="form-section">
    <h4>Upload Your Files</h4>

    <div className="upload-section" style={{ marginBottom: "16px" }}>
      <label style={{ display: "block", marginBottom: "8px" }}>Upload Resume</label>
      <input
        accept="application/pdf"
        type="file"
        name="resume"
        onChange={handleFileChange}
        className="file-input"
        style={{ width: "100%" }}
      />
    </div>

    <div className="upload-section" style={{ marginBottom: "16px" }}>
      <label style={{ display: "block", marginBottom: "8px" }}>Upload Profile Photo</label>
      <input
        accept="image/*"
        type="file"
        name="profilePicture"
        onChange={handleFileChange}
        className="file-input"
        style={{ width: "100%" }}
      />
    </div>

    <h4>Social Media Links</h4>
    <div className="form-row">
      <TextField
        label="LinkedIn"
        name="linkedin"
        value={formData.socialMedia.linkedin}
        onChange={handleLinkChange}
        sx={{ width: "48%", marginRight: "4%" }}
      />
      <TextField
        label="GitHub"
        name="github"
        value={formData.socialMedia.github}
        onChange={handleLinkChange}
        sx={{ width: "48%" }}
      />
    </div>
  </div>
);

const UserProfile = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    bio: "",
    collegeName: "", // New field for college name
    course: "",      // New field for course
    passoutYear: "", // New field for pass-out year
    skills: "",
    socialMedia: {
      linkedin: "",
      github: "",
    },
    profilePicture: null,
    resume: null,
  });

  const [errors, setErrors] = useState({});
  const [currentSection, setCurrentSection] = useState(1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLinkChange = (e) => {
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
      [name]: files[0],
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "Invalid email format";
    if (!formData.phoneNumber) newErrors.phoneNumber = "Phone number is required";
    if (!/^\d{10}$/.test(formData.phoneNumber))
      newErrors.phoneNumber = "Enter a valid phone number (10 digits)";
    if (!formData.address) newErrors.address = "Address is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form Data Submitted:", formData);
      alert("Profile saved successfully!");
    } else {
      alert("Please fix the errors in the form.");
    }
  };

  const nextSection = () => {
    if (currentSection < 3) {
      setCurrentSection(currentSection + 1);
    }
  };

  const prevSection = () => {
    if (currentSection > 1) {
      setCurrentSection(currentSection - 1);
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
            {currentSection === 1 && (
              <PersonalInfoSection
                formData={formData}
                handleChange={handleChange}
                errors={errors}
              />
            )}
            {currentSection === 2 && (
              <EducationSkillsSection
                formData={formData}
                handleChange={handleChange}
              />
            )}
            {currentSection === 3 && (
              <FileUploadSection
                handleFileChange={handleFileChange}
                handleLinkChange={handleLinkChange}
                formData={formData}
              />
            )}
<div className="button-group" style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
  {currentSection > 1 && (
    <Button variant="outlined" color="primary" onClick={prevSection}>
      Back
    </Button>
  )}
  {currentSection < 3 && (
    <Button variant="contained" color="primary" onClick={nextSection}>
      Next
    </Button>
  )}
  {currentSection === 3 && (
    <Button variant="contained" color="success" onClick={handleSubmit}>
      Save 
    </Button>
  )}
</div>

          </Box>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
