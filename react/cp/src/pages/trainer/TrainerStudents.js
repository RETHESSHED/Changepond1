import React, { useState, useEffect, useContext } from 'react';
import NoteAdd from "@mui/icons-material/NoteAdd";
import { 
  Box, Typography, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, Chip, Avatar, TextField, InputAdornment, 
  IconButton, Stack, Dialog, DialogTitle, DialogContent, DialogActions, Button,
  Grid, Divider, Pagination 
} from '@mui/material'; // Added Pagination
import { Search, Close, Edit, Visibility, Person } from '@mui/icons-material';
import { AuthContext } from '../../context/AuthContext';
import { getItems, updateItem, createItem } from '../../services/api'; // Added createItem to imports
import MainLayout from '../../components/layout/MainLayout';

const TrainerStudents = () => {
  const { user } = useContext(AuthContext);
  const [myStudents, setMyStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [noteOpen, setNoteOpen] = useState(false);
  const [noteText, setNoteText] = useState("");
  
  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; 

  // Dialog States
  const [open, setOpen] = useState(false); // Edit Dialog
  const [viewOpen, setViewOpen] = useState(false); // View Dialog
  const [selectedStudent, setSelectedStudent] = useState(null);
  
  const [formData, setFormData] = useState({ contact: '', qualification: '', address: '' });

  useEffect(() => {
    if(user && user.assignedBatches) {
      loadMyStudents();
    }
  }, [user]);

  // Reset to page 1 when searching
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const loadMyStudents = async () => {
    try {
      const response = await getItems('users?role=student');
      // Filter students who belong to batches assigned to this trainer
      const filteredByTrainer = response.data.filter(student => 
        user.assignedBatches && user.assignedBatches.includes(student.batchName)
      );
      setMyStudents(filteredByTrainer);
    } catch (error) {
      console.error("Error loading students:", error);
    }
  };

  // --- HANDLERS ---
  const handleOpenEdit = (student) => {
    setSelectedStudent(student);
    setFormData({ 
      contact: student.contact || '', 
      qualification: student.qualification || '', 
      address: student.address || '' 
    });
    setOpen(true);
  };

  const handleOpenView = (student) => {
    setSelectedStudent(student);
    setViewOpen(true);
  };

  const handleUpdate = async () => {
    try {
      const updatedData = { ...selectedStudent, ...formData };
      await updateItem('users', selectedStudent.id, updatedData);
      setOpen(false);
      loadMyStudents(); 
    } catch (error) {
      alert("Failed to update student details.");
    }
  };

  // --- SEARCH FILTER LOGIC ---
  const filteredStudents = myStudents.filter((student) => {
    const query = searchQuery.toLowerCase();
    return (
      student.name?.toLowerCase().includes(query) ||
      student.email?.toLowerCase().includes(query) ||
      student.batchName?.toLowerCase().includes(query)
    );
  });

  // --- PAGINATION LOGIC ---
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <MainLayout>
      {/* Header & Search Bar */}
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
        <Box>
          <Typography variant="h5" fontWeight="800">
            My Students
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Manage and update your batch trainees
          </Typography>
        </Box>

        <TextField
          size="small"
          placeholder="Search students..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ minWidth: 300, bgcolor: "white" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search color="action" />
              </InputAdornment>
            ),
            endAdornment: searchQuery && (
              <InputAdornment position="end">
                <IconButton onClick={() => setSearchQuery("")} size="small">
                  <Close fontSize="small" />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <TableContainer component={Paper} elevation={2} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "background.default" }}>
              <TableCell><strong>Student</strong></TableCell>
              <TableCell><strong>Contact Info</strong></TableCell>
              <TableCell><strong>Course/Batch</strong></TableCell>
              <TableCell align="right"><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentStudents.length > 0 ? (
              currentStudents.map((student) => (
                <TableRow key={student.id} hover>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Avatar sx={{ bgcolor: "secondary.main", mr: 2 }}>
                        {student.name.charAt(0)}
                      </Avatar>
                      <Box>
                        <Typography variant="body2" fontWeight="700">
                          {student.name}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {student.qualification || "N/A"}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{student.email}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {student.contact || "No contact"}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight="600">
                      {student.enrolledCourse}
                    </Typography>
                    <Chip
                      label={student.batchName}
                      size="small"
                      color="primary"
                      variant="outlined"
                      sx={{ mt: 0.5 }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                      <IconButton
                        color="warning"
                        onClick={() => {
                          setSelectedStudent(student);
                          setNoteOpen(true);
                        }}
                      >
                        <NoteAdd fontSize="small" />
                      </IconButton>

                      <IconButton
                        color="info"
                        onClick={() => handleOpenView(student)}
                      >
                        <Visibility fontSize="small" />
                      </IconButton>
                      <IconButton
                        sx={{ color: "secondary.main" }}
                        onClick={() => handleOpenEdit(student)}
                      >
                        <Edit fontSize="small" />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center" sx={{ py: 6 }}>
                  <Typography color="textSecondary">
                    No students found.
                  </Typography>
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

      {/* VIEW DETAILS DIALOG */}
      <Dialog open={viewOpen} onClose={() => setViewOpen(false)} fullWidth maxWidth="xs">
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          Student Profile
          <IconButton onClick={() => setViewOpen(false)} size="small">
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {selectedStudent && (
            <Box sx={{ textAlign: "center", py: 1 }}>
              <Avatar sx={{ width: 80, height: 80, bgcolor: "secondary.main", mx: "auto", mb: 2 }}>
                <Person sx={{ fontSize: 40 }} />
              </Avatar>
              <Typography variant="h5" fontWeight="700">{selectedStudent.name}</Typography>
              <Typography color="text.secondary" gutterBottom>Student</Typography>
              <Divider sx={{ my: 2 }} />
              <Grid container spacing={2} sx={{ textAlign: "left" }}>
                <Grid item xs={12}>
                  <Typography variant="caption" color="text.secondary">Email Address</Typography>
                  <Typography variant="body1">{selectedStudent.email}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary">Contact Number</Typography>
                  <Typography variant="body1">{selectedStudent.contact || "N/A"}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary">Qualification</Typography>
                  <Typography variant="body1">{selectedStudent.qualification || "N/A"}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary">Course</Typography>
                  <Typography variant="body1" fontWeight="600" color="primary">{selectedStudent.enrolledCourse}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary">Batch</Typography>
                  <Typography variant="body1">{selectedStudent.batchName}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="caption" color="text.secondary">Address</Typography>
                  <Typography variant="body1">{selectedStudent.address || "No address provided"}</Typography>
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
      </Dialog>

      {/* EDIT STUDENT DIALOG */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="xs">
        <DialogTitle sx={{ fontWeight: 800 }}>Update Student Info</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <Typography variant="subtitle2" color="primary">Student: {selectedStudent?.name}</Typography>
            <TextField
              label="Contact Number" fullWidth value={formData.contact}
              onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
            />
            <TextField
              label="Qualification" fullWidth value={formData.qualification}
              onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
            />
            <TextField
              label="Address" fullWidth multiline rows={2} value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpen(false)} color="inherit">Cancel</Button>
          <Button onClick={handleUpdate} variant="contained" color="secondary">Save Changes</Button>
        </DialogActions>
      </Dialog>

      {/* ADD NOTES DIALOG */}
      <Dialog open={noteOpen} onClose={() => setNoteOpen(false)} fullWidth maxWidth="xs">
        <DialogTitle>Add Note for {selectedStudent?.name}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth multiline rows={3} value={noteText}
            onChange={(e) => setNoteText(e.target.value)} placeholder="Enter note..."
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setNoteOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={async () => {
              if (!noteText.trim()) return;
              await createItem("notifications", {
                receiverId: selectedStudent.id,
                message: `Trainer ${user.name} added a note: "${noteText}"`,
                isRead: false,
                createdAt: new Date().toISOString(),
              });
              await createItem("activityLogs", {
                message: `Trainer ${user.name} added note to ${selectedStudent.name}`,
                createdAt: new Date().toISOString(),
              });
              setNoteText("");
              setNoteOpen(false);
              alert("Note added successfully!");
            }}
          >
            Save Note
          </Button>
        </DialogActions>
      </Dialog>
    </MainLayout>
  );
};

export default TrainerStudents;