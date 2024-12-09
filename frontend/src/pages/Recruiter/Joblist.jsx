import React, { useEffect, useState } from 'react';
import { Box, Button, Grid } from "@mui/material";
import axios from "axios";
import TopNavbar from './TopNavbar';
import SideNavbar from './SideNavbar';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import CodeIcon from '@mui/icons-material/Code';
import { Link } from 'react-router-dom';

const JobList = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [jobs, setJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    useEffect(() => {
        axios
          .get("http://localhost:3000/jobs/")
          .then((res) => {
            setJobs(res.data); // Set the full list of jobs
            setFilteredJobs(res.data); // Initialize filtered jobs
          
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      }, []);
  const rows = [
   
  ];

  return (
    <>
      {/* Top Navbar */}
      <TopNavbar />

      <Box sx={{ display: 'flex', height: 'auto' }}>
        {/* Sidebar */}
        <Box
          sx={{
            width: 230,
            backgroundColor: '#1976d2',
            color: '#fff',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <SideNavbar />
        </Box>
        <Box
      sx={{
        width: 505,
        height: 227,
        position: 'relative',
      }}
    >
         </Box>
     
     
   
   <Link to="/recruiter/addJob" className="line">
   <Button   sx={{
          width: 130,
          fontSize:'20px',
          height: 50,
          position: 'absolute',
          top: 150,
          left: 270,
          backgroundColor: '#f19e17',
          borderRadius: 1000,
          color:'#000000' // 18px corresponds to a value of 2 in the MUI border radius scale
        }}
      ><AddRoundedIcon className="menu-icon" />Add job</Button>
        </Link>
        

        
        <section>
        <Grid container spacing={3} sx={{ padding: 1 }}>
          {filteredJobs.map((job) => (
            <Grid item xs={12} sm={6} md={4} key={job._id}>
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
    height: 300, // Fixed height
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: 3, // Shadow for aesthetic
    borderRadius: "16px", // Rounded corners
    overflow: "hidden", // Prevent content overflow
    padding: 2 // Padding inside the card
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
 
</Card>

</Card>

            </Grid>
          ))}
        </Grid>
      </section>
       </Box>
       {/* </Box>    */}
      
    </>
  );
};

export default JobList;