import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import TopNavbar from "../Recruiter/TopNavbar"; // Top Navbar component
import SideNavbar from "../Recruiter/SideNavbar"; // Side Navbar component
import "../../css/JobPostForm.css"; // Custom styles
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

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
    deadline: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  const fetchValue = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
    if (!formData.deadline) newErrors.deadline = "Application deadline is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (location.state?.formData?._id) {
        // Edit existing job
        axios.put(`http://localhost:3000/jobs/edit/${location.state.formData._id}`, formData)
          .then(() => {
            alert("Job updated successfully!");
            navigate("/recruiter/JobList");
          })
          .catch((error) => {
            console.error(error);
            alert("Failed to update the job.");
          });
      } else {
        // Add new job
        axios
          .post("http://localhost:3000/jobs/addjob", formData)
          .then(() => {
            alert("Job posted successfully!");
            navigate("/recruiter/JobList");
          })
          .catch((error) => {
            console.error(error);
            alert("Failed to post the job.");
          });
      }
    } else {
      alert("Please fix the errors before submitting.");
    }
  };

  useEffect(() => {
    if (location.state?.formData) {
      const {
        jobTitle,
        jobDescription,
        skills,
        qualifications,
        salary,
        jobType,
        location: jobLocation,
        experienceLevel,
        deadline,
      } = location.state.formData;
      setFormData({
        jobTitle,
        jobDescription,
        skills,
        qualifications,
        salary,
        jobType,
        location: jobLocation,
        experienceLevel,
        deadline,
      });
    }
  }, [location.state]);

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
                onChange={fetchValue}
                error={!!errors.jobTitle}
                helperText={errors.jobTitle}
                required
              />
              <TextField
                select
                label="Job Type"
                name="jobType"
                value={formData.jobType}
                onChange={fetchValue}
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
                onChange={fetchValue}
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
                onChange={fetchValue}
                error={!!errors.salary}
                helperText={errors.salary}
                required
              />
            </div>
            <TextField
              label="Qualifications"
              name="qualifications"
              value={formData.qualifications}
              onChange={fetchValue}
              error={!!errors.qualifications}
              helperText={errors.qualifications}
              required
            />
            <TextField
              label="Required Skills"
              name="skills"
              value={formData.skills}
              onChange={fetchValue}
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
                value={formData.deadline}
                onChange={fetchValue}
                error={!!errors.deadline}
                helperText={errors.deadline}
                required
              />
              <TextField
                label="Location"
                name="location"
                value={formData.location}
                onChange={fetchValue}
                error={!!errors.location}
                helperText={errors.location}
                required
              />
            </div>
            <TextField
              label="Job Description"
              name="jobDescription"
              multiline
              rows={4}
              value={formData.jobDescription}
              onChange={fetchValue}
              error={!!errors.jobDescription}
              helperText={errors.jobDescription}
              required
            />
            <div style={{ display: "flex", justifyContent: "center", marginTop: "16px", }}>
              <Button variant="contained" color="primary" type="submit" sx={{ backgroundColor: '#f19e17'}} >
                {location.state ? "Update Job" : "Post Job"}
              </Button>
            </div>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default JobPostForm;