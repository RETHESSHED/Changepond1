import React, { useContext, useState, useEffect } from 'react';
import { 
  Paper, Typography, Box, Avatar, Button, Grid, Divider,
  Dialog, DialogTitle, DialogContent, TextField, DialogActions, Rating
} from '@mui/material';
import { AuthContext } from '../../context/AuthContext';
import { updateItem, getItems } from '../../services/api';
import MainLayout from '../../components/layout/MainLayout';

const TrainerDashboard = () => {
  const { user, updateUser } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    const fetchRatings = async () => {
      const res = await getItems(`feedbacks?trainerId=${user.id}`);
      const feedbacks = res.data;

      if (feedbacks.length === 0) return;

      const total = feedbacks.reduce((sum, f) => sum + f.rating, 0);
      const avg = total / feedbacks.length;

      setAverageRating(avg);
    };

    fetchRatings();
  }, [user.id]);

  const handleEditClick = () => {
    setFormData(user);
    setOpen(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      console.log("Attempting to update user ID:", user.id); 
      console.log("Data being sent:", formData);             
      await updateItem('users', user.id, formData);
      updateUser(formData);
      setOpen(false);
      alert("Profile Updated Successfully!"); 
    } catch (error) {
      console.error("Update Failed:", error); 
      alert(`Failed to update: ${error.message}`);
    }
  };

  const InfoRow = ({ label, value }) => (
    <Box sx={{ display: 'flex', mb: 1.5 }}>
      <Typography sx={{ width: '140px', fontWeight: 500, color: '#555' }}>{label}</Typography>
      <Typography sx={{ mr: 2, color: '#555' }}>:</Typography>
      <Typography sx={{ fontWeight: 500, color: '#333' }}>{value}</Typography>
    </Box>
  );

  return (
    <MainLayout>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 500 }}>
        Trainer Profile
      </Typography>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2, maxWidth: 900 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
          <Box sx={{ display: "flex", gap: 3 }}>
            <Avatar
              sx={{ width: 100, height: 100, bgcolor: "#E91E63", fontSize: 40 }}
            >
              {user.name.charAt(0)}
            </Avatar>
            <Box>
              <Typography variant="h5" fontWeight="bold">
                {user.name}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {user.email}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {user.contact}
              </Typography>
            </Box>
          </Box>

          {/* UPDATED BUTTON: Added size="small" */}
          <Box>
            <Button
              variant="outlined"
              size="small"
              onClick={handleEditClick}
              sx={{ minWidth: "100px" }} // Optional: Ensures it's not too squeezed
            >
              Edit Profile
            </Button>
          </Box>
        </Box>

        <Divider sx={{ mb: 4 }} />

        <Grid container spacing={4}>
          <Grid item xs={12}>
            <InfoRow
              label="Specialization"
              value={user.specialization || "Not Set"}
            />
            <InfoRow label="Experience" value={user.experience || "Not Set"} />
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" sx={{ mb: 2 }}>
          Assigned Batches
        </Typography>
        <Box sx={{ pl: 2 }}>
          {user.assignedBatches?.map((batch, index) => (
            <Typography key={index} sx={{ mb: 1 }}>
              {index + 1}. {batch}
            </Typography>
          ))}
        </Box>

          <Divider sx={{ my: 3 }} />

        <Typography variant="h6">Your Rating</Typography>
          <Rating value={averageRating} precision={0.5} readOnly />
        <Typography>{averageRating.toFixed(1)} / 5</Typography>
      </Paper>
      
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Edit Trainer Profile</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            name="name"
            fullWidth
            value={formData.name || ""}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Contact"
            name="contact"
            fullWidth
            value={formData.contact || ""}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Specialization"
            name="specialization"
            fullWidth
            value={formData.specialization || ""}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Experience"
            name="experience"
            fullWidth
            value={formData.experience || ""}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </MainLayout>
  );
};

export default TrainerDashboard;