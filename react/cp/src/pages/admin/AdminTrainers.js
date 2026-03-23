import React, { useState, useEffect } from 'react';
import { 
  Box, Button, Typography, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, IconButton, Dialog, DialogTitle, 
  DialogContent, TextField, DialogActions, Stack, InputAdornment, Avatar, Grid, Rating, Divider 
} from '@mui/material';
import { Delete, Add, Edit, Search, Close, Person, Visibility, Email, Phone, Work, Star } from '@mui/icons-material';
import { getItems, createItem, deleteItem, updateItem } from '../../services/api';
import MainLayout from '../../components/layout/MainLayout';

const AdminTrainers = () => {
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [trainers, setTrainers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);
  
  // View State
  const [viewOpen, setViewOpen] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState(null);

  const [isEditMode, setIsEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  
  // Form & Validation State
  const [formData, setFormData] = useState({
    name: '', email: '', password: 'trainerPassword', contact: '', 
    specialization: '', experience: '', role: 'trainer'
  });
  const [errors, setErrors] = useState({}); // Stores validation errors

  useEffect(() => { loadTrainers(); }, []);

  const loadTrainers = async () => {
    try {
      const response = await getItems('users?role=trainer');
      setTrainers(response.data);
    } catch (error) { console.error(error); }
  };

  const filteredTrainers = trainers.filter((trainer) => 
    trainer.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    trainer.specialization?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // --- VALIDATION LOGIC ---


  const validateField = (name, value) => {
     let message = "";
    if (!value || value.toString().trim() === "") {
      message = "This field is required";
    } else if (name !== 'address' && value.toString().includes(" ")) {
      message = "Spaces are not allowed";
    } else {
      if (name === "email") {
        const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        if (!gmailRegex.test(value)) message = "Use a valid @gmail.com address";
      }

      if (name === "contact") {
        if (!/^[0-9]{10}$/.test(value)) message = "Must be 10 digits";
      } 
       if (!value.trim()) message = "Specialization is required.";
       if (!value.trim()) message = "Experience is required.";
      
    }

    setErrors((prev) => ({ ...prev, [name]: message }));
    return message === "";
  };



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error immediately when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const validateForm = () => {
    const isNameValid = validateField("name", formData.name);
    const isEmailValid = validateField("email", formData.email);
    const isContactValid = validateField("contact", formData.contact);
    const isSpecValid = validateField("specialization", formData.specialization);
    const isExpValid = validateField("experience", formData.experience);
    return isNameValid && isEmailValid && isContactValid && isSpecValid && isExpValid;
  };

  // --- HANDLERS ---
  const handleOpenAdd = () => {
    setIsEditMode(false);
    setErrors({}); // Clear previous errors
    setFormData({ name: '', email: '', password: 'trainerPassword', contact: '', specialization: '', experience: '', role: 'trainer' });
    setOpen(true);
  };

  const handleOpenEdit = (trainer) => {
    setIsEditMode(true);
    setCurrentId(trainer.id);
    setErrors({}); // Clear previous errors
    setFormData(trainer);
    setOpen(true);
  };

  const handleOpenView = async (trainer) => {
    setSelectedTrainer(trainer);
    setViewOpen(true);

    try {
      const res = await getItems(`feedbacks?trainerId=${trainer.id}`);
      const feedbacks = res.data;

      if (feedbacks.length === 0) {
        setAverageRating(0);
        setTotalReviews(0);
        return;
      }

      const total = feedbacks.reduce((sum, f) => sum + (f.rating || 0), 0);
      const avg = total / feedbacks.length;

      setAverageRating(avg);
      setTotalReviews(feedbacks.length);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave = async () => {
    // Run full validation before saving
    if (!validateForm()) return;

    try {
      if (isEditMode) await updateItem('users', currentId, formData);
      else await createItem('users', formData);
      setOpen(false);
      loadTrainers();
    } catch (error) { alert("Failed"); }
  };

  const handleDelete = async (id) => {
    if(window.confirm("Delete trainer?")) {
      await deleteItem('users', id);
      loadTrainers();
    }
  };

  return (
    <MainLayout>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
          gap: 2,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 800 }}>
          Manage Trainers
        </Typography>
        <Stack
          direction="row"
          spacing={2}
          sx={{ width: { xs: "100%", md: "auto" } }}
        >
          <TextField
            size="small"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ minWidth: 320, bgcolor: "white" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search color="action" />
                </InputAdornment>
              ),
              endAdornment: searchQuery && (
                <InputAdornment position="end">
                  <IconButton onClick={() => setSearchQuery("")}>
                    <Close fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleOpenAdd}
          >
            Add Trainer
          </Button>
        </Stack>
      </Box>

      <TableContainer component={Paper} elevation={2} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "background.default" }}>
              <TableCell>
                <strong>Profile</strong>
              </TableCell>
              <TableCell>
                <strong>Email</strong>
              </TableCell>
              <TableCell>
                <strong>Specialization</strong>
              </TableCell>
              <TableCell>
                <strong>Experience</strong>
              </TableCell>
              <TableCell align="right">
                <strong>Actions</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTrainers.map((trainer) => (
              <TableRow key={trainer.id} hover>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Avatar
                      sx={{ bgcolor: "secondary.main", width: 32, height: 32 }}
                    >
                      <Person fontSize="small" />
                    </Avatar>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {trainer.name}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>{trainer.email}</TableCell>
                <TableCell>
                  <Typography
                    variant="body2"
                    color="primary.main"
                    fontWeight="600"
                  >
                    {trainer.specialization}
                  </Typography>
                </TableCell>
                <TableCell>{trainer.experience}</TableCell>
                <TableCell align="right">
                  <Stack direction="row" spacing={1} justifyContent="flex-end">
                    <IconButton
                      color="info"
                      onClick={() => handleOpenView(trainer)}
                    >
                      <Visibility fontSize="small" />
                    </IconButton>
                    <IconButton
                      sx={{ color: "secondary.main" }}
                      onClick={() => handleOpenEdit(trainer)}
                    >
                      <Edit fontSize="small" />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(trainer.id)}
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* ADD/EDIT DIALOG */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {isEditMode ? "Update Trainer" : "New Trainer"}
        </DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ mt: 1 }}>
            
            <TextField
              label="Full Name"
              name="name"
              fullWidth
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!errors.name}
              helperText={errors.name}
              InputProps={{
                startAdornment: <InputAdornment position="start"><Person color="action" /></InputAdornment>,
              }}
            />

            <TextField
              label="Email"
              name="email"
              fullWidth
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!errors.email}
              helperText={errors.email}
              InputProps={{
                startAdornment: <InputAdornment position="start"><Email color="action" /></InputAdornment>,
              }}
            />

            <TextField
              label="Contact"
              name="contact"
              fullWidth
              value={formData.contact}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!errors.contact}
              helperText={errors.contact}
              InputProps={{
                startAdornment: <InputAdornment position="start"><Phone color="action" /></InputAdornment>,
              }}
            />

            <TextField
              label="Specialization"
              name="specialization"
              fullWidth
              value={formData.specialization}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!errors.specialization}
              helperText={errors.specialization}
              InputProps={{
                startAdornment: <InputAdornment position="start"><Work color="action" /></InputAdornment>,
              }}
            />

            <TextField
              label="Experience"
              name="experience"
              fullWidth
              value={formData.experience}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!errors.experience}
              helperText={errors.experience}
              InputProps={{
                startAdornment: <InputAdornment position="start"><Star color="action" /></InputAdornment>,
              }}
            />

          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            {isEditMode ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* VIEW DETAILS DIALOG */}
      <Dialog
        open={viewOpen}
        onClose={() => setViewOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Trainer Profile
          <IconButton onClick={() => setViewOpen(false)} size="small">
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {selectedTrainer && (
            <Box sx={{ textAlign: "center", py: 2 }}>
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  bgcolor: "secondary.main",
                  mx: "auto",
                  mb: 2,
                }}
              >
                <Person sx={{ fontSize: 40 }} />
              </Avatar>
              <Typography variant="h5" fontWeight="700">
                {selectedTrainer.name}
              </Typography>
              <Typography color="text.secondary" gutterBottom>
                Instructor
              </Typography>
              <Box sx={{ my: 2 }}>
                <Rating value={averageRating} precision={0.5} readOnly />
                <Typography variant="body2" color="text.secondary">
                  {totalReviews > 0
                    ? `${averageRating.toFixed(1)} / 5 (${totalReviews} reviews)`
                    : "No ratings yet"}
                </Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Grid container spacing={2} sx={{ textAlign: "left" }}>
                <Grid item xs={12}>
                  <Typography variant="caption" color="text.secondary">
                    Email
                  </Typography>
                  <Typography variant="body1">
                    {selectedTrainer.email}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary">
                    Contact
                  </Typography>
                  <Typography variant="body1">
                    {selectedTrainer.contact || "N/A"}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary">
                    Experience
                  </Typography>
                  <Typography variant="body1">
                    {selectedTrainer.experience || "0 Years"}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="caption" color="text.secondary">
                    Specialization
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: "primary.main", fontWeight: "bold" }}
                  >
                    {selectedTrainer.specialization || "General"}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default AdminTrainers;