import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createItem, getItems } from '../../services/api';
import {
  Container, Paper, TextField, Button, Typography, Alert,
  Box, Grid, MenuItem, Link, InputAdornment
} from '@mui/material';
import {
  Person, Email, Lock, Phone, School, Home
} from '@mui/icons-material';

const Register = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [batches, setBatches] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    contact: '',
    qualification: '',
    address: '',
    enrolledCourse: '',
  });

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [cRes, bRes] = await Promise.all([
          getItems('courses'),
          getItems('batches')
        ]);
        setCourses(cRes.data || []);
        setBatches(bRes.data || []);
        if (cRes.data && cRes.data.length > 0) {
          setFormData(prev => ({ ...prev, enrolledCourse: cRes.data[0].name }));
        }
      } catch (err) {
        setError("Database connection error.");
      }
    };
    fetchOptions();
  }, []);

  // 1. Validation Logic
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
      if (name === "password") {
        const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*]).{6,}$/;
        if (!passwordRegex.test(value)) message = "Min 6 chars, 1 number, 1 special char";
      }
      if (name === "contact") {
        if (!/^[0-9]{10}$/.test(value)) message = "Must be 10 digits";
      }
    }
    setErrors(prev => ({ ...prev, [name]: message }));
    return message === "";
  };

  // 2. Handle Change (Clears error while typing)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  // 3. Handle Blur (Triggers red line when clicking away)
  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    // Final validation check for all fields
    let isValid = true;
    Object.keys(formData).forEach(key => {
      if (!validateField(key, formData[key])) isValid = false;
    });

    if (!isValid) {
      setError("Please fix the errors in the form.");
      return;
    }

    setLoading(true);
    setError('');

    try {
      const usersRes = await getItems('users');
      if (usersRes.data.some(u => u.email === formData.email)) {
        setErrors(prev => ({ ...prev, email: "Email already registered" }));
        setLoading(false);
        return;
      }

      const assignedBatch = batches.find(b => {
        const course = formData.enrolledCourse.toLowerCase();
        if (course.includes("full stack")) return b.name.startsWith("FS");
        if (course.includes("python")) return b.name.startsWith("PY");
        if (course.includes("java")) return b.name.startsWith("JA");
        if (course.includes("ui")) return b.name.startsWith("UI");
        return false;
      });

      if (!assignedBatch) {
        setError("No active batch available for this course.");
        setLoading(false);
        return;
      }

      const studentObject = {
        ...formData,
        id: Date.now().toString(),
        role: 'student',
        batchName: assignedBatch.name,
        trainerId: assignedBatch.trainerId
      };

      await createItem('users', studentObject);
      alert(`Success! Enrolled in ${assignedBatch.name}`);
      navigate('/login');
    } catch (err) {
      setError("Server error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', bgcolor: '#f4f7fe', py: 5 }}>
      <Container maxWidth="sm">
        <Paper elevation={10} sx={{ p: 4, borderRadius: 4, borderTop: '6px solid #F59E0B' }}>
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Typography variant="h4" fontWeight="900" sx={{ color: '#393b3f' }}>
              Student <Box component="span" sx={{ color: '#F59E0B' }}>Portal</Box>
            </Typography>
            <Typography variant="body2" color="textSecondary">Create your account to start learning</Typography>
          </Box>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <Box component="form" onSubmit={handleRegister} noValidate>
            <Grid spacing={2}>
              {['name', 'email', 'password', 'contact', 'qualification'].map((field) => (
                <Grid item xs={12} key={field}>
                  <TextField
                    name={field}
                    label={field.charAt(0).toUpperCase() + field.slice(1)}
                    type={field === 'password' ? 'password' : 'text'}
                    fullWidth
                    required
                    sx={{ mb: 2 }}
                    value={formData[field]}
                    onChange={handleChange}
                    onBlur={handleBlur} // <--- Triggers validation on click away
                    error={Boolean(errors[field])} // <--- Turns line red
                    helperText={errors[field]} // <--- Shows error text
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          {field === 'name' && <Person />}
                          {field === 'email' && <Email />}
                          {field === 'password' && <Lock />}
                          {field === 'contact' && <Phone />}
                          {field === 'qualification' && <School />}
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
              ))}

              <Grid item xs={12}>
                <TextField
                  select
                  label="Enrolled Course"
                  fullWidth
                  sx={{ mb: 2 }}
                  required
                  value={formData.enrolledCourse}
                  onChange={(e) => setFormData({ ...formData, enrolledCourse: e.target.value })}
                >
                  {courses.map((c) => (
                    <MenuItem key={c.id} value={c.name}>{c.name}</MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  name="address"
                  label="Permanent Address"
                  multiline
                  rows={2}
                  fullWidth
                  required
                  value={formData.address}
                  onChange={handleChange}
                  onBlur={handleBlur} // <--- Triggers validation on click away
                  error={Boolean(errors.address)} // <--- Turns line red
                  helperText={errors.address} // <--- Shows error text
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start"><Home sx={{ mt: -1 }} /></InputAdornment>
                    )
                  }}
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{ mt: 3, py: 1.5, fontWeight: 'bold', bgcolor: '#393b3f', '&:hover': { bgcolor: '#1a1b1d' } }}
            >
              {loading ? 'Processing...' : 'Register Now'}
            </Button>
            
            <Typography textAlign="center" sx={{ mt: 2 }}>
              <Link href="/login" sx={{ color: '#F59E0B', textDecoration: 'none', fontWeight: 'bold' }}>
                Back to Login
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Register;