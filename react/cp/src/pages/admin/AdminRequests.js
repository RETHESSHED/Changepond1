import React, { useEffect, useState } from 'react';
import { 
  Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Button, Chip, Avatar, Stack, Divider 
} from '@mui/material';
import { 
  CheckCircle, Cancel, VpnKey, History, PendingActions 
} from '@mui/icons-material';
import MainLayout from '../../components/layout/MainLayout';
import { getItems, updateItem } from '../../services/api'; 

const AdminRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {
      const res = await getItems('passwordRequests');
      // Sort: Newest first
      const sorted = res.data.sort((a, b) => new Date(b.date) - new Date(a.date));
      setRequests(sorted);
    } catch (error) {
      console.error("Error loading requests", error);
    }
  };

  // --- FIXED APPROVE LOGIC ---
  const handleAccept = async (req) => {
    if(!window.confirm(`Update password for ${req.userName}?`)) return;

    try {
      console.log("1. Starting Approval for Request:", req);

      // STEP 1: Find the User (Robust Method)
      // We fetch ALL users and search manually to avoid ID type mismatch (String vs Number)
      const allUsersRes = await getItems('users');
      const userData = allUsersRes.data.find(u => u.id == req.userId); // Note: '==' allows "5" == 5

      if (!userData) {
        alert(`Error: User with ID ${req.userId} not found in the database.`);
        console.error("User not found. Available users:", allUsersRes.data);
        return;
      }

      console.log("2. User Found:", userData);

      // STEP 2: Update User Password
      const updatedUser = { ...userData, password: req.newPassword };
      await updateItem('users', userData.id, updatedUser);
      console.log("3. Password Updated in Users Table");

      // STEP 3: Update Request Status to 'approved'
      const updatedRequest = { ...req, status: 'approved' };
      await updateItem('passwordRequests', req.id, updatedRequest);
      console.log("4. Request Status Updated to 'approved'");

      // STEP 4: Refresh UI
      alert(`Success! Password for ${req.userName} is updated.`);
      loadRequests(); 

    } catch (error) {
      console.error("APPROVAL FAILED:", error);
      alert("Failed to update. Check the Console (F12) for details.");
    }
  };

  // --- REJECT LOGIC ---
  const handleReject = async (req) => {
    if(!window.confirm("Reject this request?")) return;

    try {
      const updatedRequest = { ...req, status: 'rejected' };
      await updateItem('passwordRequests', req.id, updatedRequest);
      loadRequests();
    } catch (error) {
      console.error("Reject Failed:", error);
    }
  };

  // --- SEPARATE THE LISTS ---
  const pendingRequests = requests.filter(r => r.status === 'pending');
  // Show BOTH approved and rejected in history
  const historyRequests = requests.filter(r => r.status === 'approved' || r.status === 'rejected');

  return (
    <MainLayout>
      
      {/* --- TABLE 1: PENDING REQUESTS --- */}
      <Box sx={{ mb: 4 }}>
        <Stack direction="row" alignItems="center" spacing={1} mb={2}>
          <PendingActions color="warning" fontSize="large" />
          <Typography variant="h5" fontWeight="800">Pending Requests</Typography>
        </Stack>
        
        <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 3, mb: 2, borderTop: '4px solid #ed6c02' }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#fff7ed' }}>
                <TableCell><strong>User Details</strong></TableCell>
                <TableCell><strong>Role</strong></TableCell>
                <TableCell><strong>Date</strong></TableCell>
                <TableCell align="right"><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pendingRequests.length > 0 ? (
                pendingRequests.map((req) => (
                  <TableRow key={req.id} hover>
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Avatar sx={{ bgcolor: 'warning.main' }}>
                          <VpnKey />
                        </Avatar>
                        <Box>
                          <Typography fontWeight="700">{req.userName}</Typography>
                          <Typography variant="caption" color="text.secondary">{req.email}</Typography>
                        </Box>
                      </Stack>
                    </TableCell>
                    <TableCell><Chip label={req.role.toUpperCase()} size="small" sx={{ fontWeight: 'bold' }} /></TableCell>
                    <TableCell>{req.date}</TableCell>
                    <TableCell align="right">
                      <Button 
                        startIcon={<CheckCircle />} 
                        variant="contained" 
                        color="success"
                        size="small" 
                        sx={{ mr: 1 }} 
                        onClick={() => handleAccept(req)}
                      >
                        Approve
                      </Button>
                      <Button 
                        startIcon={<Cancel />} 
                        variant="outlined" 
                        color="error"
                        size="small" 
                        onClick={() => handleReject(req)}
                      >
                        Reject
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ py: 4, color: 'text.secondary' }}>
                    No pending requests.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Divider sx={{ my: 6 }} />

      {/* --- TABLE 2: HISTORY --- */}
      <Box>
        <Stack direction="row" alignItems="center" spacing={1} mb={2}>
          <History color="primary" fontSize="large" />
          <Typography variant="h5" fontWeight="800" color="text.secondary">Request History</Typography>
        </Stack>

        <TableContainer component={Paper} elevation={1} sx={{ borderRadius: 3, bgcolor: '#f8fafc' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {historyRequests.length > 0 ? (
                historyRequests.map((req) => (
                  <TableRow key={req.id}>
                    <TableCell>
                      <Typography fontWeight="500">{req.userName}</Typography>
                      <Typography variant="caption" color="text.secondary">{req.email}</Typography>
                    </TableCell>
                    <TableCell>{req.date}</TableCell>
                    <TableCell>
                      <Chip 
                        label={req.status.toUpperCase()} 
                        color={req.status === 'approved' ? 'success' : 'error'} 
                        variant={req.status === 'approved' ? 'filled' : 'outlined'}
                        size="small"
                        icon={req.status === 'approved' ? <CheckCircle /> : <Cancel />}
                      />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} align="center" sx={{ py: 3, color: 'text.secondary' }}>
                    History is empty.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

    </MainLayout>
  );
};

export default AdminRequests;