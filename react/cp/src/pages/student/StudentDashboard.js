import React, { useContext, useState } from 'react';
import { 
  Paper, Typography, Box, Avatar, Button, Grid, Divider, 
  Dialog, DialogTitle, DialogContent, TextField, DialogActions, Rating, MenuItem
} from '@mui/material';
import { AuthContext } from '../../context/AuthContext';
import { updateItem, createItem, getItems } from "../../services/api";
import MainLayout from '../../components/layout/MainLayout';

const StudentDashboard = () => {
  const { user, updateUser } = useContext(AuthContext);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const [rating, setRating] = useState(0);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({});

  const handleEditClick = () => {
    setFormData(user); // Load current user data into form
    setOpen(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      // 1. Update Backend
      await updateItem('users', user.id, formData);
      // 2. Update Context (Local State)
      updateUser(formData);
      // 3. Close Dialog
      setOpen(false);
      alert("Profile Updated Successfully!");
    } catch (error) {
      alert("Failed to update profile. Is the server running?");
    }
  };

  const InfoRow = ({ label, value }) => (
    <Box sx={{ display: 'flex', mb: 2 }}>
      <Typography sx={{ width: '120px', fontWeight: 500, color: '#555' }}>{label}</Typography>
      <Typography sx={{ mr: 2, color: '#555' }}>:</Typography>
      <Typography sx={{ fontWeight: 500, color: '#333' }}>{value}</Typography>
    </Box>
  );

  return (
    <MainLayout>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 500 }}>
        Student Profile
      </Typography>

      <Paper elevation={3} sx={{ p: 4, borderRadius: 2, maxWidth: 900 }}>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 4,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            <Avatar
              sx={{ width: 100, height: 100, bgcolor: "#1976D2", fontSize: 40 }}
            >
              {user.name.charAt(0)}
            </Avatar>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                {user.name}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Email: {user.email}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Contact: {user.contact}
              </Typography>
            </Box>
          </Box>
          <Button variant="outlined" onClick={handleEditClick}>
            Edit Profile
          </Button>
        </Box>

        <Divider sx={{ mb: 4 }} />

        <Grid container spacing={4}>
          <Grid item xs={12}>
            <InfoRow label="Email" value={user.email} />
            <InfoRow label="Contact" value={user.contact} />
            <InfoRow label="Gender" value={user.gender || "Not Set"} />
            <InfoRow label="DOB"
             value={user.dob || "Not Set"} />
            <InfoRow label="Address" value={user.address || "Not Set"} />
            <InfoRow
              label="Qualification"
              value={user.qualification || "Not Set"}
            />
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Course Info */}
        <Typography variant="h6" sx={{ mb: 2 }}>
          Enrolled Course
        </Typography>
        <Box sx={{ bgcolor: "#E3F2FD", p: 3, borderRadius: 2 }}>
          <Typography variant="subtitle1" color="primary" fontWeight="bold">
            {user.enrolledCourse}
          </Typography>
          <Typography variant="body2">
            Batch Name: <strong>{user.batchName}</strong>
          </Typography>
        </Box>
        <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={() => setFeedbackOpen(true)}
        >
          Give Feedback
        </Button>
      </Paper>

      <Dialog
        open={feedbackOpen}
        onClose={() => setFeedbackOpen(false)}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>Give Feedback</DialogTitle>
        <DialogContent>
          <Rating
            value={rating}
            onChange={(event, newValue) => {
              setRating(newValue);
            }}
          />
          <TextField
            fullWidth
            multiline
            rows={3}
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            placeholder="Write your feedback..."
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setFeedbackOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={async () => {
              if (!feedbackText.trim()) return;
              try {
                const trainerRes = await getItems("users?role=trainer");
                const trainer = trainerRes.data.find((t) =>
                  t.assignedBatches?.includes(user.batchName),
                );

                if (!trainer) {
                  alert("Trainer not found");
                  return;
                }

                await createItem("feedbacks", {
                  studentId: user.id,
                  studentName: user.name,
                  trainerId: trainer.id,
                  trainerName: trainer.name,
                  rating: rating,
                  message: feedbackText,
                  createdAt: new Date().toISOString(),
                });

                await createItem("notifications", {
                  receiverId: trainer.id.toString(), // safer as string
                  message: `Student ${user.name} gave feedback: "${feedbackText}"`,
                  isRead: false,
                  createdAt: new Date().toISOString(),
                });

                await createItem("activityLogs", {
                  message: `Student ${user.name} gave feedback to ${trainer.name}`,
                  createdAt: new Date().toISOString(),
                });

                setFeedbackText("");
                setFeedbackOpen(false);
                setRating(0);
                alert("Feedback submitted!");
              } catch (error) {
                console.error(error);
                alert("Something went wrong");
              }
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Full Name"
            name="name"
            fullWidth
            value={formData.name || ""}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Contact Number"
            name="contact"
            fullWidth
            value={formData.contact || ""}
            onChange={handleChange}
          />
          <TextField
            select
            margin="dense"
            label="Gender"
            name="gender"
            fullWidth
            value={formData.gender || ""}
            onChange={handleChange}
          > 
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>
          <MenuItem value="Others">Others</MenuItem>
          </TextField>
          <TextField
            margin="dense"
            
            type="date"
            name="dob"
            fullWidth
            value={formData.dob || ""}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Address"
            name="address"
            fullWidth
            value={formData.address || ""}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Qualification"
            name="qualification"
            fullWidth
            value={formData.qualification || ""}
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

export default StudentDashboard;