import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Box, Button, Typography, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, IconButton, Dialog, DialogTitle, 
  DialogContent, TextField, DialogActions, Stack, InputAdornment, Chip, Grid, Divider, List, ListItem, ListItemText, ListItemAvatar, Avatar
} from '@mui/material';
import { Delete, Add, Edit, Search, Close, People, Visibility, School, Person, AccessTime, Class } from '@mui/icons-material';
import { getItems, createItem, deleteItem, updateItem } from '../../services/api';
import MainLayout from '../../components/layout/MainLayout';

const AdminCourses = () => {
  const location = useLocation();
  const [courses, setCourses] = useState([]);
  const [allStudents, setAllStudents] = useState([]); 
  const [studentCounts, setStudentCounts] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  
  // CRUD 
  const [open, setOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [formData, setFormData] = useState({ name: '', duration: '' });
  const [errors, setErrors] = useState({}); // Stores validation errors

  // View 
  const [viewOpen, setViewOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Student List
  const [studentListOpen, setStudentListOpen] = useState(false);
  const [currentCourseStudents, setCurrentCourseStudents] = useState([]);
  const [selectedCourseName, setSelectedCourseName] = useState("");

  useEffect(() => {
    if (location.state?.openAdd) {
      handleOpenAdd();
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    try {
      const [coursesRes, usersRes] = await Promise.all([getItems('courses'), getItems('users')]);
      const courseList = coursesRes.data;
      const students = usersRes.data.filter(u => u.role === 'student');

      setAllStudents(students); 

      const counts = {};
      courseList.forEach(c => counts[c.name] = 0);
      students.forEach(s => { 
        if (s.enrolledCourse && counts[s.enrolledCourse] !== undefined) {
          counts[s.enrolledCourse]++; 
        }
      });

      setCourses(courseList);
      setStudentCounts(counts);
    } catch (error) { console.error(error); }
  };

  const filteredCourses = courses.filter((c) => c.name?.toLowerCase().includes(searchQuery.toLowerCase()));

  // --- VALIDATION LOGIC ---
  const validateField = (name, value) => {
    let errorMsg = "";

    switch (name) {
      case "name":
        if (!value.trim()) errorMsg = "Course Name is required.";
        break;
      case "duration":
        if (!value) errorMsg = "Duration is required.";
        else if (isNaN(value) || Number(value) <= 0) errorMsg = "Enter a valid number of months.";
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
    const isDurationValid = validateField("duration", formData.duration);
    return isNameValid && isDurationValid;
  };

  // --- HANDLERS ---
  
  const handleOpenAdd = () => {
    setIsEditMode(false);
    setErrors({});
    setFormData({ name: '', duration: '' });
    setOpen(true);
  };

  const handleOpenEdit = (course) => {
    setIsEditMode(true);
    setCurrentId(course.id);
    setErrors({});
    // Extract just the number from "6 Months" for the input field
    const numericDuration = course.duration ? course.duration.replace(" Months", "") : "";
    setFormData({ ...course, duration: numericDuration });
    setOpen(true);
  };

  const handleOpenView = (course) => {
    setSelectedCourse(course);
    setViewOpen(true);
  };

  const handleViewStudents = (courseName) => {
    const enrolled = allStudents.filter(s => s.enrolledCourse === courseName);
    setCurrentCourseStudents(enrolled);
    setSelectedCourseName(courseName);
    setStudentListOpen(true);
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      // Append " Months" to the number before saving
      const finalData = {
        ...formData,
        duration: `${formData.duration} Months`
      };

      if (isEditMode) await updateItem('courses', currentId, finalData);
      else await createItem('courses', finalData);
      
      setOpen(false);
      loadData();
    } catch (error) { alert("Failed to save course."); }
  };

  const handleDelete = async (id) => {
    if(window.confirm("Delete course?")) {
      await deleteItem('courses', id);
      loadData();
    }
  };

  return (
    <MainLayout>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 800 }}>Manage Courses</Typography>
        <Stack direction="row" spacing={2}>
          <TextField
            size="small" placeholder="Search..." value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ minWidth: 300, bgcolor: 'white' }}
            InputProps={{
              startAdornment: (<InputAdornment position="start"><Search color="action" /></InputAdornment>),
              endAdornment: searchQuery && (<InputAdornment position="end"><IconButton onClick={() => setSearchQuery("")}><Close fontSize="small" /></IconButton></InputAdornment>)
            }}
          />
          <Button variant="contained" startIcon={<Add />} onClick={handleOpenAdd}>Add Course</Button>
        </Stack>
      </Box>

      <TableContainer component={Paper} elevation={2} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: 'background.default' }}>
              <TableCell><strong>Course Name</strong></TableCell>
              <TableCell><strong>Duration</strong></TableCell>
              <TableCell><strong>Enrolled</strong></TableCell>
              <TableCell align="right"><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCourses.map((c) => (
              <TableRow key={c.id} hover>
                <TableCell sx={{ fontWeight: 600 }}>{c.name}</TableCell>
                <TableCell>{c.duration}</TableCell>
                <TableCell>
                  <Chip 
                    icon={<People sx={{ fontSize: 16 }} />} 
                    label={`${studentCounts[c.name] || 0} Students`} 
                    size="small" 
                    onClick={() => handleViewStudents(c.name)} 
                    color={studentCounts[c.name] > 0 ? "primary" : "default"} 
                    variant={studentCounts[c.name] > 0 ? "filled" : "outlined"}
                    sx={{ cursor: 'pointer', '&:hover': { opacity: 0.8 } }}
                  />
                </TableCell>
                <TableCell align="right">
                  <Stack direction="row" spacing={1} justifyContent="flex-end">
                    <IconButton color="info" onClick={() => handleOpenView(c)}><Visibility fontSize="small" /></IconButton>
                    <IconButton sx={{ color: 'secondary.main' }} onClick={() => handleOpenEdit(c)}><Edit fontSize="small" /></IconButton>
                    <IconButton color="error" onClick={() => handleDelete(c.id)}><Delete fontSize="small" /></IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* ADD/EDIT DIALOG */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>{isEditMode ? "Update Course" : "New Course"}</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ mt: 1 }}>
            
            <TextField 
              label="Course Name" 
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
              label="Duration" 
              name="duration"
              type="number" // Enforce numbers
              fullWidth 
              value={formData.duration} 
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!errors.duration}
              helperText={errors.duration}
              InputProps={{
                startAdornment: <InputAdornment position="start"><AccessTime color="action" /></InputAdornment>,
                endAdornment: <InputAdornment position="end">Months</InputAdornment>, // Suffix
              }}
            />

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
          Course Details
          <IconButton onClick={() => setViewOpen(false)} size="small"><Close /></IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {selectedCourse && (
            <Box sx={{ textAlign: 'center', py: 2 }}>
               <Box sx={{ p: 2, bgcolor: 'primary.light', borderRadius: '50%', width: 60, height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2 }}>
                  <School sx={{ fontSize: 30, color: 'white' }} />
               </Box>
              <Typography variant="h5" fontWeight="700">{selectedCourse.name}</Typography>
              <Divider sx={{ my: 2 }} />
              <Grid container spacing={2} sx={{ textAlign: 'left' }}>
                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary">Duration</Typography>
                  <Typography variant="body1">{selectedCourse.duration}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary">Total Students</Typography>
                  <Typography variant="body1" fontWeight="bold">{studentCounts[selectedCourse.name] || 0}</Typography>
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
      </Dialog>

      {/* STUDENT LIST DIALOG */}
      <Dialog open={studentListOpen} onClose={() => setStudentListOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 700 }}>
          Students in {selectedCourseName}
        </DialogTitle>
        <DialogContent dividers sx={{ p: 0 }}>
          {currentCourseStudents.length > 0 ? (
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
              {currentCourseStudents.map((student) => (
                <React.Fragment key={student.id}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'primary.main' }}>
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
                          {student.batchName && ` — Batch: ${student.batchName}`}
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
              <Typography color="text.secondary">No students enrolled in this course yet.</Typography>
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

export default AdminCourses;