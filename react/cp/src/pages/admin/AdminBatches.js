import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Box, Button, Typography, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, IconButton, Dialog, DialogTitle, 
  DialogContent, TextField, DialogActions, MenuItem, Stack, InputAdornment, Chip, Grid, Divider,
  List, ListItem, ListItemText, ListItemAvatar, Avatar
} from '@mui/material';
import { Delete, Add, Edit, Search, Close, AccessTime, People, Visibility, Class, Person, AssignmentInd } from '@mui/icons-material'; 
import { getItems, createItem, deleteItem, updateItem } from '../../services/api';
import MainLayout from '../../components/layout/MainLayout';

// Predefined Time Slots for the Dropdown
const timeSlots = [
  "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", 
  "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", 
  "05:00 PM", "06:00 PM"
];

const AdminBatches = () => {
  const location = useLocation();
  const [batches, setBatches] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [allStudents, setAllStudents] = useState([]); 
  const [studentCounts, setStudentCounts] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  
  // CRUD 
  const [open, setOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  
  // Form & Validation State
  const [formData, setFormData] = useState({ name: '', trainerId: '', time: '' });
  const [errors, setErrors] = useState({}); // Store validation errors

  // View 
  const [viewOpen, setViewOpen] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState(null);

  // Student List 
  const [studentListOpen, setStudentListOpen] = useState(false);
  const [currentBatchStudents, setCurrentBatchStudents] = useState([]);
  const [selectedBatchName, setSelectedBatchName] = useState("");

  useEffect(() => {
    if (location.state?.openAdd) {
      handleOpenAdd();
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    try {
      const [bRes, uRes] = await Promise.all([getItems('batches'), getItems('users')]);
      const batchList = bRes.data;
      const allUsers = uRes.data;
      const trainerList = allUsers.filter(u => u.role === 'trainer');
      const studentList = allUsers.filter(u => u.role === 'student');

      setAllStudents(studentList); 
      setBatches(batchList);
      setTrainers(trainerList);

      const counts = {};
      batchList.forEach(b => counts[b.name] = 0);
      studentList.forEach(student => {
        if (student.batchName && counts[student.batchName] !== undefined) counts[student.batchName]++;
      });
      setStudentCounts(counts);
    } catch (error) { console.error(error); }
  };

  const getTrainerName = (id) => {
    const t = trainers.find(tr => tr.id === id);
    return t ? t.name : 'Unknown';
  };

  const filteredBatches = batches.filter((b) => 
    b.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    getTrainerName(b.trainerId).toLowerCase().includes(searchQuery.toLowerCase())
  );

  // --- VALIDATION LOGIC ---
  const validateField = (name, value) => {
    let errorMsg = "";

    switch (name) {
      case "name":
        if (!value.trim()) errorMsg = "Batch Name is required.";
        break;
      case "trainerId":
        if (!value) errorMsg = "Please assign a trainer.";
        break;
      case "time":
        if (!value) errorMsg = "Time slot is required.";
        break;
      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
    return errorMsg === "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error immediately when user types/selects
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
    const isTrainerValid = validateField("trainerId", formData.trainerId);
    const isTimeValid = validateField("time", formData.time);
    return isNameValid && isTrainerValid && isTimeValid;
  };

  // --- HANDLERS ---
  const handleOpenAdd = () => {
    setIsEditMode(false);
    setErrors({}); // Clear previous errors
    setFormData({ name: '', trainerId: '', time: '' });
    setOpen(true);
  };

  const handleOpenEdit = (batch) => {
    setIsEditMode(true);
    setCurrentId(batch.id);
    setErrors({}); // Clear previous errors
    setFormData(batch);
    setOpen(true);
  };

  const handleOpenView = (batch) => {
    setSelectedBatch(batch);
    setViewOpen(true);
  };

  const handleViewBatchStudents = (batchName) => {
    const assignedStudents = allStudents.filter(s => s.batchName === batchName);
    setCurrentBatchStudents(assignedStudents);
    setSelectedBatchName(batchName);
    setStudentListOpen(true);
  };

  const handleSave = async () => {
    // Run full validation before saving
    if (!validateForm()) return;

    try {
      if (isEditMode) await updateItem('batches', currentId, formData);
      else await createItem('batches', formData);
      setOpen(false);
      loadData();
    } catch (error) { alert("Failed to save batch."); }
  };

  const handleDelete = async (id) => {
    if(window.confirm("Delete batch?")) {
      await deleteItem('batches', id);
      loadData();
    }
  };

  return (
    <MainLayout>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 800 }}>Manage Batches</Typography>
        <Stack direction="row" spacing={2}>
          <TextField
            size="small" placeholder="Search..." value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ minWidth: 320, bgcolor: 'white' }}
            InputProps={{
              startAdornment: (<InputAdornment position="start"><Search color="action" /></InputAdornment>),
              endAdornment: searchQuery && (<InputAdornment position="end"><IconButton onClick={() => setSearchQuery("")}><Close fontSize="small" /></IconButton></InputAdornment>)
            }}
          />
          <Button variant="contained" startIcon={<Add />} onClick={handleOpenAdd}>Create Batch</Button>
        </Stack>
      </Box>

      <TableContainer component={Paper} elevation={2} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: 'background.default' }}>
              <TableCell><strong>Batch Name</strong></TableCell>
              <TableCell><strong>Trainer</strong></TableCell>
              <TableCell><strong>Time</strong></TableCell>
              <TableCell><strong>Students</strong></TableCell>
              <TableCell align="right"><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBatches.map((b) => (
              <TableRow key={b.id} hover>
                <TableCell sx={{ fontWeight: 700 }}>{b.name}</TableCell>
                <TableCell>{getTrainerName(b.trainerId)}</TableCell>
                <TableCell><Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><AccessTime fontSize="small" color="action" />{b.time}</Box></TableCell>
                <TableCell>
                  <Chip 
                    icon={<People sx={{ fontSize: 16 }} />} 
                    label={`${studentCounts[b.name] || 0} Students`} 
                    size="small" 
                    onClick={() => handleViewBatchStudents(b.name)} 
                    variant={studentCounts[b.name] > 0 ? "filled" : "outlined"}
                    sx={{ cursor: 'pointer', '&:hover': { opacity: 0.8 } }}
                  />
                </TableCell>
                <TableCell align="right">
                  <Stack direction="row" spacing={1} justifyContent="flex-end">
                    <IconButton color="info" onClick={() => handleOpenView(b)}><Visibility fontSize="small" /></IconButton>
                    <IconButton sx={{ color: 'secondary.main' }} onClick={() => handleOpenEdit(b)}><Edit fontSize="small" /></IconButton>
                    <IconButton color="error" onClick={() => handleDelete(b.id)}><Delete fontSize="small" /></IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* ADD/EDIT DIALOG */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>{isEditMode ? "Modify Batch" : "New Batch"}</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ mt: 1 }}>
            
            <TextField 
              label="Batch Name" 
              name="name"
              fullWidth 
              value={formData.name} 
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!errors.name}
              helperText={errors.name}
              InputProps={{
                startAdornment: <InputAdornment position="start"><Class color="action" /></InputAdornment>,
              }}
            />
            
            <TextField 
              select 
              label="Trainer" 
              name="trainerId"
              fullWidth 
              value={formData.trainerId} 
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!errors.trainerId}
              helperText={errors.trainerId}
              InputProps={{
                startAdornment: <InputAdornment position="start"><AssignmentInd color="action" /></InputAdornment>,
              }}
            >
              {trainers.map((t) => <MenuItem key={t.id} value={t.id}>{t.name}</MenuItem>)}
            </TextField>
            
            <TextField 
              select 
              label="Time Slot" 
              name="time"
              fullWidth 
              value={formData.time} 
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!errors.time}
              helperText={errors.time}
              InputProps={{
                startAdornment: <InputAdornment position="start"><AccessTime color="action" /></InputAdornment>,
              }}
            >
              {timeSlots.map((slot) => (
                <MenuItem key={slot} value={slot}>
                  {slot}
                </MenuItem>
              ))}
            </TextField>

          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">{isEditMode ? "Update" : "Save"}</Button>
        </DialogActions>
      </Dialog>

      {/* VIEW DETAILS */}
      <Dialog open={viewOpen} onClose={() => setViewOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          Batch Details
          <IconButton onClick={() => setViewOpen(false)} size="small"><Close /></IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {selectedBatch && (
            <Box sx={{ textAlign: 'center', py: 2 }}>
               <Box sx={{ p: 2, bgcolor: 'success.light', borderRadius: '50%', width: 60, height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2 }}>
                  <Class sx={{ fontSize: 30, color: 'white' }} />
               </Box>
              <Typography variant="h5" fontWeight="700">{selectedBatch.name}</Typography>
              <Divider sx={{ my: 2 }} />
              <Grid container spacing={2} sx={{ textAlign: 'left' }}>
                <Grid item xs={12}>
                  <Typography variant="caption" color="text.secondary">Assigned Trainer</Typography>
                  <Typography variant="body1" fontWeight="600">{getTrainerName(selectedBatch.trainerId)}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary">Schedule Time</Typography>
                  <Typography variant="body1">{selectedBatch.time}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary">Active Students</Typography>
                  <Typography variant="body1">{studentCounts[selectedBatch.name] || 0}</Typography>
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
      </Dialog>

      {/* STUDENT LIST DIALOG */}
      <Dialog open={studentListOpen} onClose={() => setStudentListOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 700 }}>
          Students in Batch: {selectedBatchName}
        </DialogTitle>
        <DialogContent dividers sx={{ p: 0 }}>
          {currentBatchStudents.length > 0 ? (
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
              {currentBatchStudents.map((student) => (
                <React.Fragment key={student.id}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'info.main' }}>
                        <Person />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText 
                      primary={
                        <Typography variant="subtitle1" fontWeight="600">
                          {student.name}
                        </Typography>
                      }
                      secondary={
                        <React.Fragment>
                          <Typography variant="body2" component="span" color="text.primary">
                            {student.email}
                          </Typography>
                          {student.enrolledCourse && ` — Course: ${student.enrolledCourse}`}
                        </React.Fragment>
                      } 
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </React.Fragment>
              ))}
            </List>
          ) : (
            <Box sx={{ p: 4, textAlign: 'center' }}>
              <Typography color="text.secondary">No students assigned to this batch yet.</Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setStudentListOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </MainLayout>
  );
};

export default AdminBatches;