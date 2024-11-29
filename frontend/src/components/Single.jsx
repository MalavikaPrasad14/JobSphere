// import React from "react";
// import { useLocation, Link, useNavigate } from "react-router-dom";
// import { Card, CardContent, Typography, Button, Modal, Box } from "@mui/material";

// const Single = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { job } = location.state || {}; // Retrieve the job object passed via state

//   const styles = {
//     modalContainer: {
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//     },
//     card: {
//       background: "#ffffff", // White card background
//       boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Soft shadow
//       borderRadius: "8px",
//       maxWidth: "700px",
//       width: "90%",
//       padding: "20px",
//       fontFamily: "Arial, sans-serif",
//     },
//     header: {
//       color: "#003399",
//       fontWeight: "bold",
//       marginBottom: "16px",
//     },
//     subtitle: {
//       color: "#666666", // Subtle gray for subtitles
//       marginBottom: "16px",
//     },
//     details: {
//       lineHeight: "1.6",
//       marginBottom: "20px",
//       fontSize: "16px",
//       color: "#333333", // Standard text color
//     },
//     backButton: {
//       backgroundColor: "#003399", 
//       color: "#ffffff",
//       padding: "10px 20px",
//       border: "none",
//       borderRadius: "5px",
//       textTransform: "uppercase",
//       fontWeight: "bold",
//       cursor: "pointer",
//       textDecoration: "none",
//       display: "inline-block",
//       textAlign: "center",
//       marginTop: "20px",
//     },
//     noJobMessage: {
//       textAlign: "center",
//       color: "#ff0000",
//       fontWeight: "bold",
//       margin: "20px",
//     },
//   };

//   if (!job) {
//     return (
//       <Modal open={true} onClose={() => navigate("/search")} style={styles.modalContainer}>
//         <Box style={styles.card}>
//           <Typography variant="h6" style={styles.noJobMessage}>
//             No job details found!
//           </Typography>
//           <Button onClick={() => navigate("/search")} style={styles.backButton}>
//             Go Back
//           </Button>
//         </Box>
//       </Modal>
//     );
//   }

//   return (
//     <Modal open={true} onClose={() => navigate("/search")} style={styles.modalContainer}>
//       <Box style={styles.card}>
//         <CardContent>
//           <Typography variant="h4" style={styles.header} gutterBottom>
//             {job.jobTitle}
//           </Typography>
//           <Typography variant="h6" style={styles.subtitle}>
//             Company: {job.companyName}
//           </Typography>
//           <Typography variant="body1" style={styles.details}>
//             Location: {job.location || "Not specified"}
//           </Typography>
//           <Typography variant="body1" style={styles.details}>
//             Category: {job.category || "Not specified"}
//           </Typography>
//           <Typography variant="body1" style={styles.details}>
//             Job Description: {job.description || "No description available"}
//           </Typography>
//           <Typography variant="body1" style={styles.details}>
//             Salary Range:{" "}
//             {job.salaryRange
//               ? Min: $${job.salaryRange.min} - Max: $${job.salaryRange.max}
//               : "Not specified"}
//           </Typography>
//           <Typography variant="body1" style={styles.details}>
//             Skills Required: {job.skillsRequired || "Not specified"}
//           </Typography>
//           <Typography variant="body1" style={styles.details}>
//             Requirements: {job.requirements || "Not specified"}
//           </Typography>
//           <Typography variant="body1" style={styles.details}>
//             Application Deadline: {job.applicationDeadline || "Not specified"}
//           </Typography>
//         </CardContent>
//         <Button onClick={() => navigate("/search")} style={styles.backButton}>
//           Apply
//         </Button>
//       </Box>
//     </Modal>
//   );
// };

// export default Single;


import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CardContent, Typography, Button, Modal, Box } from "@mui/material";

const Single = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { job } = location.state || {}; // Retrieve the job object passed via state

  const styles = {
    modalContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    card: {
      background: "#ffffff",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      borderRadius: "8px",
      maxWidth: "700px",
      width: "90%",
      padding: "20px",
      fontFamily: "Arial, sans-serif",
    },
    header: {
      color: "orange",
      fontWeight: "bold",
      marginBottom: "16px",
    },
    subtitle: {
      color: "#666666",
      marginBottom: "16px",
    },
    details: {
      lineHeight: "1.6",
      marginBottom: "20px",
      fontSize: "16px",
      color: "#333333",
    },
    backButton: {
      backgroundColor: "#EB5B00",
      color: "white",
      padding: "10px 20px",
      border: "none",
      borderRadius: "5px",
      textTransform: "uppercase",
      fontWeight: "bold",
      cursor: "pointer",
      textDecoration: "none",
      display: "inline-block",
      textAlign: "center",
      marginTop: "20px",
      marginLeft: "286px",

    },
    noJobMessage: {
      textAlign: "center",
      color: "#ff0000",
      fontWeight: "bold",
      margin: "20px",
    },
  };

  if (!job) {
    return (
      <Modal
        open={true}
        onClose={() => navigate("/search")}
        aria-labelledby="no-job-modal"
        aria-describedby="no-job-description"
        sx={styles.modalContainer}
      >
        <Box sx={styles.card}>
          <Typography id="no-job-modal" variant="h6" sx={styles.noJobMessage}>
            No job details found!
          </Typography>
          <Button onClick={() => navigate("/search")} sx={styles.backButton}>
            Go Back
          </Button>
        </Box>
      </Modal>
    );
  }

  return (
    <Modal
      open={true}
      onClose={() => navigate("/search")}
      aria-labelledby="job-details-modal"
      aria-describedby="job-details-description"
      sx={styles.modalContainer}
    >
      <Box sx={styles.card}>
        <CardContent>
          <Typography id="job-details-modal" variant="h4" sx={styles.header}>
            {job.jobTitle}
          </Typography>
          <Typography variant="h6" sx={styles.subtitle}>
            Company: {job.companyName}
          </Typography>
          <Typography variant="body1" sx={styles.details}>
            Location: {job.location || "Not specified"}
          </Typography>
          <Typography variant="body1" sx={styles.details}>
            Category: {job.category || "Not specified"}
          </Typography>
          <Typography variant="body1" sx={styles.details}>
            Job Description: {job.description || "No description available"}
          </Typography>
          <Typography variant="body1" sx={styles.details}>
            Salary Range:{" "}
            {job.salaryRange
              ? `Min: $${job.salaryRange.min} - Max: $${job.salaryRange.max}`
              : "Not specified"}
          </Typography>
          <Typography variant="body1" sx={styles.details}>
            Skills Required: {job.skillsRequired || "Not specified"}
          </Typography>
          <Typography variant="body1" sx={styles.details}>
            Requirements: {job.requirements || "Not specified"}
          </Typography>
          <Typography variant="body1" sx={styles.details}>
            Application Deadline: {job.applicationDeadline || "Not specified"}
          </Typography>
        </CardContent>
        <Button onClick={() => navigate("/home")} sx={styles.backButton}>
          Apply
        </Button>
      </Box>
    </Modal>
  );
};

export default Single;
