import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/material';

import TopNavbar from '../Recruiter/TopNavbar';
import SideNavbar2 from './SideNavbar2';

const UserShortlisted = () => {
  const rows = [
   
  ];

  return (
    <>
      {/* Top Navbar */}
      <TopNavbar/>

      <Box sx={{ display: 'flex', height: '85vh' }}>
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
          <SideNavbar2/>
        </Box>

        {/* Main Content */}
        <Box sx={{ flex: 1, padding: 3 }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500, backgroundColor: '#B1F0F7'}} aria-label="shortlisted candidates">
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell align="left">Company Name</TableCell>
                  <TableCell align="left">Email ID</TableCell>
                  <TableCell align="left">Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <img src={row.profileImage} alt={row.candidate} width="50" height="50" />
                    </TableCell>
                    <TableCell align="left">{row.candidate}</TableCell>
                    <TableCell align="left">{row.email}</TableCell>
                    <TableCell align="left">
                      <a href="#" style={{ textDecoration: 'none', color: 'blue' }}>
                        {row.resume}
                      </a>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </>
  );
};

export default UserShortlisted;