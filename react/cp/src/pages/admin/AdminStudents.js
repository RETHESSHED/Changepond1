import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Box, Button, Typography, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, IconButton, Dialog, DialogTitle, 
  DialogContent, TextField, DialogActions, MenuItem, Stack, InputAdornment,
  Grid, Divider, Avatar, Pagination 
} from '@mui/material';
import { Delete, Add, Edit, Search, Close, Visibility, Person, Email, Phone, School, Class } from '@mui/icons-material';
import { getItems, createItem, deleteItem, updateItem } from '../../services/api';
import MainLayout from '../../components/layout/MainLayout';

const AdminStudents = () => {
  const location = useLocation();
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [batches, setBatches] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; 

  // Dialog States
  const [open, setOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false); 
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Form & Validation State
  const [formData, setFormData] = useState({
    name: '', email: '', password: 'student123', contact: '', 
    role: 'student', enrolledCourse: '', batchName: '', qualification: ''
  });
  const [errors, setErrors] = useState({}); // Stores validation error messages

  useEffect(() => {
    if (location.state?.openAdd) {
      handleOpenAdd();
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const loadData = async () => {
    try {
      const studentRes = await getItems('users?role=student');
      const courseRes = await getItems('courses');
      const batchRes = await getItems('batches');
      setStudents(studentRes.data);
      setCourses(courseRes.data);
      setBatches(batchRes.data);
    } catch (error) {
      console.error("Connection Error", error);
    }
  };

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
      if (!value.trim()) message = "Qualification is required.";
      
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
    const isQualValid = validateField("qualification", formData.qualification);
    return isNameValid && isEmailValid && isContactValid && isQualValid;
  };

  // --- FILTER & PAGINATION ---
  const filteredStudents = students.filter((student) => {
    const query = searchQuery.toLowerCase();
    return (
      student.name?.toLowerCase().includes(query) ||
      student.email?.toLowerCase().includes(query) ||
      student.contact?.includes(query) ||
      student.enrolledCourse?.toLowerCase().includes(query)
    );
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // --- HANDLERS ---
  const handleOpenAdd = () => {
    setIsEditMode(false);
    setCurrentId(null);
    setErrors({}); // Clear errors
    setFormData({ name: '', email: '', password: 'student123', contact: '', role: 'student', enrolledCourse: '', batchName: '', qualification: '' });
    setOpen(true);
  };

  const handleOpenEdit = (student) => {
    setIsEditMode(true);
    setCurrentId(student.id);
    setErrors({}); // Clear errors
    setFormData(student);
    setOpen(true);
  };

  const handleOpenView = (student) => {
    setSelectedStudent(student);
    setViewOpen(true);
  };

  const handleSave = async () => {
    // Run full validation before submitting
    if (!validateForm()) return;

    try {
      if (isEditMode) await updateItem('users', currentId, formData);
      else await createItem('users', formData);
      setOpen(false);
      loadData();
    } catch (error) { 
      alert("Action Failed!"); 
    }
  };

  const handleDelete = async (id) => {
    if(window.confirm("Delete this student?")) {
      await deleteItem('users', id);
      loadData();
    }
  };

  return (
    <MainLayout>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'center', mb: 4, gap: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 800 }}>Manage Students</Typography>
        <Stack direction="row" spacing={2} sx={{ width: { xs: '100%', md: 'auto' } }}>
          <TextField
            size="small" placeholder="Search..." value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ minWidth: 300, bgcolor: 'white' }}
            InputProps={{
              startAdornment: (<InputAdornment position="start"><Search color="action" /></InputAdornment>),
              endAdornment: searchQuery && (<InputAdornment position="end"><IconButton onClick={() => setSearchQuery("")}><Close fontSize="small" /></IconButton></InputAdornment>)
            }}
          />
          <Button variant="contained" startIcon={<Add />} onClick={handleOpenAdd}>Add Student</Button>
        </Stack>
      </Box>

      <TableContainer component={Paper} elevation={2} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: 'background.default' }}>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell><strong>Contact</strong></TableCell>
              <TableCell><strong>Course / Batch</strong></TableCell>
              <TableCell align="right"><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentStudents.length > 0 ? (
              currentStudents.map((student) => (
                <TableRow key={student.id} hover>
                  <TableCell sx={{ fontWeight: 500 }}>{student.name}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.contact}</TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>{student.enrolledCourse}</Typography>
                    <Typography variant="caption" color="secondary.main">{student.batchName}</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                      <IconButton color="info" onClick={() => handleOpenView(student)}>
                        <Visibility fontSize="small" />
                      </IconButton>
                      <IconButton sx={{ color: 'secondary.main' }} onClick={() => handleOpenEdit(student)}>
                        <Edit fontSize="small" />
                      </IconButton>
                      <IconButton color="error" onClick={() => handleDelete(student.id)}>
                        <Delete fontSize="small" />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                  No students found matching your criteria.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* --- PAGINATION CONTROLS --- */}
      {filteredStudents.length > itemsPerPage && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, mb: 1 }}>
          <Pagination 
            count={totalPages} 
            page={currentPage} 
            onChange={handlePageChange} 
            color="primary" 
            showFirstButton 
            showLastButton
            shape="rounded"
          />
        </Box>
      )}

      {/* ADD/EDIT DIALOG */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{isEditMode ? "Update Student" : "New Student"}</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ mt: 1 }}>
            
            <TextField 
              label="Name" 
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
              label="Qualification" 
              name="qualification" 
              fullWidth 
              value={formData.qualification} 
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!errors.qualification}
              helperText={errors.qualification}
              InputProps={{
                startAdornment: <InputAdornment position="start"><School color="action" /></InputAdornment>,
              }}
            />
            
            <TextField 
              select 
              label="Course" 
              name="enrolledCourse" 
              fullWidth 
              value={formData.enrolledCourse} 
              onChange={handleChange}
            >
              {courses.map((c) => <MenuItem key={c.id} value={c.name}>{c.name}</MenuItem>)}
            </TextField>
            
            <TextField 
              select 
              label="Batch" 
              name="batchName" 
              fullWidth 
              value={formData.batchName} 
              onChange={handleChange}
            >
              {batches.map((b) => <MenuItem key={b.id} value={b.name}>{b.name}</MenuItem>)}
            </TextField>
            
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">{isEditMode ? "Update" : "Save"}</Button>
        </DialogActions>
      </Dialog>

      {/* VIEW DETAILS DIALOG */}
      <Dialog open={viewOpen} onClose={() => setViewOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          Student Details
          <IconButton onClick={() => setViewOpen(false)} size="small"><Close /></IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {selectedStudent && (
            <Box sx={{ textAlign: 'center', py: 2 }}>
              <Avatar sx={{ width: 80, height: 80, bgcolor: 'primary.main', mx: 'auto', mb: 2, fontSize: 32 }}>
                {selectedStudent.name.charAt(0)}
              </Avatar>
              <Typography variant="h5" fontWeight="700">{selectedStudent.name}</Typography>
              <Typography color="text.secondary" gutterBottom>{selectedStudent.role.toUpperCase()}</Typography>
              
              <Divider sx={{ my: 2 }} />
              
              <Grid container spacing={2} sx={{ textAlign: 'left' }}>
                <Grid item xs={12}>
                  <Typography variant="caption" color="text.secondary">Email Address</Typography>
                  <Typography variant="body1">{selectedStudent.email}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary">Contact</Typography>
                  <Typography variant="body1">{selectedStudent.contact || 'N/A'}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary">Qualification</Typography>
                  <Typography variant="body1">{selectedStudent.qualification || 'N/A'}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary">Enrolled Course</Typography>
                  <Typography variant="body1" color="primary.main" fontWeight="600">{selectedStudent.enrolledCourse || 'None'}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary">Batch</Typography>
                  <Typography variant="body1">{selectedStudent.batchName || 'Unassigned'}</Typography>
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default AdminStudents;