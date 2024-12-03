import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Box,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { Edit, Delete } from '@mui/icons-material';
import TopNavbar from './TopNavbar';
import SideNavbar from './SideNavbar';
import "../../css/RecruiterProfile.css";

// Define applications array
const applications = [

];

const JobApplicationsTable = () => {
  return (
    <>
      <TopNavbar />

      <Box sx={{ display: 'flex', height: '85vh' }}>
        {/* Sidebar */}
        <Box
          sx={{
            width: 230, // Set fixed width for sidebar
            backgroundColor: '#1976d2', // Adjust as needed
            color: '#fff',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <SideNavbar />
        </Box>

        {/* Main Content */}
        <Box
          sx={{
            flexGrow: 1,
            p: 3,
            overflowX: 'auto',
            backgroundColor: '#f9f9f9',
          }}
          className="form-wrapper"
        >
          <Paper sx={{ width: '100%', mb: 2, overflow: 'hidden' }}>
           

            <TableContainer>
              <Table sx={{backgroundColor:"#B1F0F7"}}>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography variant="body2" fontWeight="bold">
                        Avatar
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="bold">
                        Email ID
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="bold">
                        Applicant
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="bold">
                        Resume
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="bold">
                        Date
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="bold">
                        Actions
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {applications.map((application) => (
                    <TableRow key={application.id} hover>
                      <TableCell>
                        <img
                          src=""
                          alt="avatar"
                          style={{ width: 50, height: 50, borderRadius: '50%' }}
                        />
                      </TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell>
                        <a
                          href="#"
                          style={{
                            textDecoration: 'underline',
                            color: '#1976d2',
                            cursor: 'pointer',
                          }}
                        >
                          
                        </a>
                      </TableCell>
                      <TableCell>
                        {new Date().toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <IconButton color="primary" aria-label="accept">
                            <CheckIcon fontSize="small" />
                          </IconButton>
                          <IconButton color="error" aria-label="delete">
                            <Delete fontSize="small" />
                          </IconButton>
                        
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      </Box>
    </>
  );
};

export default JobApplicationsTable;