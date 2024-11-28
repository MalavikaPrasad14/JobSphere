import React, { useEffect, useState } from "react";
import log from "../assets/orangelogo.png";
import { Form, Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Footer from "../components/Footer";
import { Grid, TextField } from "@mui/material";
import axios from "axios";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [locations, setLocations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Fetch jobs and filter data
  useEffect(() => {
    axios
      .get("http://localhost:3000/jobs/")
      .then((res) => {
        setJobs(res.data); // Set the full list of jobs
        setFilteredJobs(res.data); // Initialize filtered jobs
        setLocations([...new Set(res.data.map((job) => job.location))]); // Extract unique locations
        setCategories([...new Set(res.data.map((job) => job.category))]); // Extract unique categories
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Handle search functionality
  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchQuery.toLowerCase().trim();
    const results = jobs.filter((job) => {
      const matchesTitle = job.jobTitle.toLowerCase().includes(query);
      const matchesCompany = job.companyName.toLowerCase().includes(query);
      const matchesLocation =
        selectedLocation === "" || job.location === selectedLocation;
      const matchesCategory =
        selectedCategory === "" || job.category === selectedCategory;

      return (matchesTitle || matchesCompany) && matchesLocation && matchesCategory;
    });
    setFilteredJobs(results);
  };

  // Styles
  const styles = {
    heroSection: {
      marginTop: "0px",
      height: "500px",
      backgroundImage: "url(/Images/home.jpg)",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    },
    searchBar: {
      display: "flex",
      justifyContent: "center",
      gap: "10px",
      marginTop: "200px",
    },
    inputSelect: {
      padding: "10px",
      width: "200px",
      borderRadius: "5px",
    },
  };

  return (
    <div className="home-container">
      <header className="navbar">
        <div className="logo">
          <img src={log} alt="JobSphere Logo" style={{ width: 90, height: 90 }} />
          <span style={{ fontWeight: 600, fontSize: 25 }}>JobSphere</span>
        </div>
        <nav className="nav-links">
          <Link to={"/"}>Home</Link>
          <Link to={"/"}>About us</Link>
          <Link to={"/login"}>Join</Link>
        </nav>
      </header>
      <main style={styles.heroSection}>
        <div style={styles.searchBar}>
          <form
            onSubmit={handleSearch}
            style={{ maxWidth: "600px", margin: "0 auto", display: "flex", gap: "16px" }}
          >
            <TextField
              fullWidth
              placeholder="Search..."
              variant="outlined"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {/* <select
              style={styles.inputSelect}
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            > */}
              {/* <option value="">Select Location</option>
              {locations.map((location, index) => (
                <option key={index} value={location}>
                  {location}
                </option>
              ))} */}
            {/* </select> */}
            {/* <select
              style={styles.inputSelect}
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            > */}
              {/* <option value="">Select Category</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))} */}
            {/* </select> */}
            <Button type="submit" variant="contained" color="primary">
              Search
            </Button>
          </form>
        </div>
      </main>
      <section>
        <Grid container spacing={3} sx={{ padding: 1 }}>
          {filteredJobs.map((job) => (
            <Grid item xs={12} sm={6} md={4} key={job._id}>
              <Card sx={{ maxWidth: 345 }}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {job.companyName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {job.jobTitle}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Location: {job.location}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Category: {job.category}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Share</Button>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </section>
      <Footer />
    </div>
  );
};

export default Home;