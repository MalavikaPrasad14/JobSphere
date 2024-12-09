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


import "../../css/RecruiterProfile.css";
import SideNavbar2 from './SideNavbar2';
import TopNavbar from '../Recruiter/TopNavbar';


// Define applications array
const applications = [

];

const Applied = () => {
  return (
    <>
      <TopNavbar/>

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
        <SideNavbar2/>
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
          <Paper sx={{ width: '100%', mb: 2, overflow: 'hidden'}}>
           

            <TableContainer>
              <Table sx={{backgroundColor:"#B1F0F7", marginTop:'4%' }}>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography variant="body2" fontWeight="bold">
                        
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="bold">
                        Email ID
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="bold">
                        CompanyName
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="bold">
                        Post
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="bold">
                        Date
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="bold">
                        Status
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
                        <Box sx={{ display: 'flex', gap: 1 }}>
                         
                        
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

export default Applied;