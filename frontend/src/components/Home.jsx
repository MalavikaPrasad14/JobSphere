import React, { useEffect, useState } from "react";
import log from "../assets/orangelogo.png";
import { Form, Link, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Footer from "../components/Footer";
import { Box, Grid, IconButton, InputAdornment, TextField } from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PaidIcon from '@mui/icons-material/Paid';
import WorkIcon from '@mui/icons-material/Work';
import CodeIcon from '@mui/icons-material/Code';
import axios from "axios";
import StarIcon from '@mui/icons-material/Star';
import Carousel from "react-material-ui-carousel"
import carouselImage from "../assets/image3.jpg"
import carouselImages from "../assets/image4.jpg"
import carouselImage1 from "../assets/image5.jpg"
import SearchIcon from "@mui/icons-material/Search";
const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [locations, setLocations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const carouselItems = [
    {
      image: carouselImage,
      
    },
    {
      image: carouselImages,
      
    },
    {
      image: carouselImage1,
      
    },
  ];
  







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
  
    const navigate = useNavigate();
  
    const handleUpdate = (job) => {
      navigate("/home/single", { state: { job } }); // Pass job details to Single.jsx
    };

  // Styles
  const styles = {
    heroSection: {
      marginTop: "0px",
      height: "500px",
      backgroundImage: "url(Images/home.jpg)",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      padding:"10px"
    },
    
  }
  return (
    <div className="home-container">
      <header className="navbar">
        <div className="logo">
          <img src={log} alt="JobSphere Logo" style={{ width: 90, height: 90 }} />
          <span style={{ fontWeight: 600, fontSize: 25 }}>JobSphere</span>
        </div>
        <nav className="nav-links">
          <Link to={"/"}>Home</Link>
          <Link to={"/aboutus"}>About us</Link>
          <Link to={"/login"}>Join</Link>
        </nav>
      </header>
      <Carousel
  indicators={true}
  interval={4000}
  animation="slide"
  navButtonsAlwaysVisible={true}
  style={{ marginTop: "20px" }}
>
  {carouselItems.map((item, index) => (
    <div
      key={index}
      style={{
        width: "100%",
        height: "500px", // Adjust to match the height of the carousel
        backgroundImage:` url(${item.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative", // Make the parent container relative for absolute positioning
        paddingTop:"450px",
        paddingBottom:"200px"
      }}
    >
      {/* Text Overlay */}
      <div
        style={{
          position: "absolute",
          top: "30%", // Adjust the vertical position of the text
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "black", // Text color
          textAlign: "center",
        }}
      >
        
      </div>

      {/* Centered Search Bar */}
      <form
        onSubmit={handleSearch}
        style={{
          position: "absolute",
          top: "60%", // Adjust vertical position of the search bar
          left: "50%",
          width:"40%",
          transform: "translate(-50%, -50%)", // Center horizontally and vertically
          display: "flex",
          gap: "10px",
          
        }}
      >
        <TextField
          fullWidth
          placeholder="Search..."
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{"& .MuiOutlinedInput-root": {
            borderRadius: "50px",
            backgroundColor: "#f9f9f9",
          },}}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton type="submit" sx={{backgroundColor:"orange",color: "white",borderRadius: "40px",padding: "5px",minWidth: "30px"}}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        />
        
      </form>
    </div>
  ))}
</Carousel>




      
      <section>
        <Grid container spacing={3} sx={{ padding: 1 }}>
          {filteredJobs.map((job) => (
            <Grid item xs={12} sm={6} md={3} key={job._id}>
              <Card
  sx={{
    maxWidth: 345,
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
    transition: "transform 0.3s, box-shadow 0.3s", // Smooth hover effects
    "&:hover": {
      transform: "scale(1.05)", // Slight scale-up on hover
      boxShadow: "0 6px 16px rgba(0, 0, 0, 0.2)", // More prominent shadow on hover
    },
    backgroundColor: "#f9f9f9", // Light background color
  }}
>
<Card
  sx={{
    width: 300, // Fixed width
    height: 350, // Fixed height
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: 3, // Shadow for aesthetic
    borderRadius: "16px", // Rounded corners
    overflow: "hidden", // Prevent content overflow
    padding: 2, // Padding inside the card
  }}
>
  <CardContent
    sx={{
      flexGrow: 1, // Ensure content takes available space
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
    }}
  >
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 1,
      }}
    >
      <Typography
        gutterBottom
        variant="h6"
        component="div"
        sx={{
          fontWeight: "bold",
          color: "#000000",
          textAlign: "left",
        }}
      >
        {job.jobTitle}
      </Typography>
    </Box>
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 0.5,
      }}
    >
      <Typography
        variant="body2"
        color="#E07B39"
        sx={{
          fontWeight: "bold",
          fontFamily: "'Roboto', sans-serif",
        }}
      >
        {job.companyName}
      </Typography>
    </Box>
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        gap: 2,
        marginBottom: 2,
      }}
    >
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ display: "flex", alignItems: "center", gap: 1 }}
      >
        <LocationOnIcon sx={{ color: "#808080" }} /> {job.location || "Not specified"}
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ display: "flex", alignItems: "center", gap: 1 }}
      >
        <WorkIcon sx={{ color: "#808080" }} /> {job.experienceRequired || "Not specified"}
      </Typography>
    </Box>
    <Typography
      variant="body2"
      color="text.secondary"
      sx={{
        textAlign: "left",
        display: "flex",
        alignItems: "center",
        gap: 1,
      }}
    >
      <CodeIcon sx={{ color: "#808080" }} /> {job.skillsRequired?.join(", ") || "Skills not specified"}
    </Typography>
  </CardContent>
  <CardActions sx={{ justifyContent: "center" }}>
    <Button
      onClick={() => handleUpdate(job)}
      sx={{
        backgroundColor: "#003399",
        color: "#ffffff",
        fontWeight: "bold",
        textTransform: "uppercase",
        padding: "8px 16px",
        borderRadius: "20px",
        "&:hover": {
          backgroundColor: "#002366",
        },
      }}
    >
      Learn More
    </Button>
  </CardActions>
</Card>

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