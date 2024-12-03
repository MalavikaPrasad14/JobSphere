import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import TopNavbar from "../Recruiter/TopNavbar"; // Top Navbar component
import SideNavbar from "../Recruiter/SideNavbar"; // Side Navbar component
import "../../css/JobPostForm.css"; // Custom styles

const jobTypes = ["Full-time", "Part-time", "Remote", "Contract"];
const experienceLevels = ["Fresher", "Mid-level", "Senior"];

const JobPostForm = () => {
  const [formData, setFormData] = useState({
    jobTitle: "",
    jobDescription: "",
    skills: "",
    qualifications: "",
    salary: "",
    jobType: "",
    location: "",
    experienceLevel: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.jobTitle) newErrors.jobTitle = "Job Title is required";
    if (!formData.jobDescription) newErrors.jobDescription = "Job Description is required";
    if (!formData.skills) newErrors.skills = "Required Skills are required";
    if (!formData.qualifications) newErrors.qualifications = "Qualifications are required";
    if (!formData.salary) newErrors.salary = "Salary range is required";
    if (!formData.jobType) newErrors.jobType = "Job Type is required";
    if (!formData.location) newErrors.location = "Location is required";
    if (!formData.experienceLevel) newErrors.experienceLevel = "Experience Level is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form Data Submitted:", formData);
      alert("Job posted successfully!");
    } else {
      alert("Please fix the errors before submitting.");
    }
  };

  return (
    <div className="layout">
      <TopNavbar />
      <div className="content">
        <SideNavbar />
        <div className="form-wrapper">
          <h3 className="form-heading">Post a New Job</h3>
          <Box
            component="form"
            sx={{ "& .MuiTextField-root": { m: 1, width: "98%" } }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <div className="form-row">
            <TextField
              label="Job Title"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              error={!!errors.jobTitle}
              helperText={errors.jobTitle}
              required
            />
            
            <TextField
              select
              label="Job Type"
              name="jobType"
              value={formData.jobType}
              onChange={handleChange}
              error={!!errors.jobType}
              helperText={errors.jobType}
              required
            >
              {jobTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>
            </div>
            <div className="form-row">
            <TextField
              select
              label="Experience Level"
              name="experienceLevel"
              value={formData.experienceLevel}
              onChange={handleChange}
              error={!!errors.experienceLevel}
              helperText={errors.experienceLevel}
              required
            >
              {experienceLevels.map((level) => (
                <MenuItem key={level} value={level}>
                  {level}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Salary Range"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              error={!!errors.salary}
              helperText={errors.salary}
              required
            />
            
            
            </div>
            <TextField
              label="Qualifications"
              name="qualifications"
              value={formData.qualifications}
              onChange={handleChange}
              error={!!errors.qualifications}
              helperText={errors.qualifications}
              required
            />
            <TextField
              label="Required Skills"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              error={!!errors.skills}
              helperText={errors.skills}
              required
            />
            <div className="form-row">
            <TextField
            label="Deadline"
            name="deadline"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={formData.eventDate}
            onChange={handleChange}
            error={!!errors.eventDate}
            helperText={errors.eventDate}
            required
          />
            
            <TextField
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              error={!!errors.location}
              helperText={errors.location}
              required
            /></div>
            
            
            <TextField
              label="Job Description"
              name="jobDescription"
              multiline
              rows={4}
              value={formData.jobDescription}
              onChange={handleChange}
              error={!!errors.jobDescription}
              helperText={errors.jobDescription}
              required
            />
            <div style={{ display: "flex", justifyContent: "center", marginTop: "16px" }}>
              <Button variant="contained" color="primary" type="submit">
                Post Job
              </Button>
            </div>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default JobPostForm;
