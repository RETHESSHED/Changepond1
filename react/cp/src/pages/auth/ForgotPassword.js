import React, { useState } from 'react';
import { 
  Box, Container, Paper, Typography, TextField, Button, Alert, Link, InputAdornment
} from '@mui/material';
import { Email, Lock, LockReset } from '@mui/icons-material'; // Added Icons
import { useNavigate } from 'react-router-dom';
import { getItems, createItem } from '../../services/api'; 

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', newPassword: '', confirmPassword: '' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [errors, setErrors] = useState({});

  // --- SINGLE FIELD VALIDATION (For onBlur) ---
  const validateField = (name, value) => {
    let errorMsg = "";

    if (name === "email") {
      if (!value) errorMsg = "Email is required.";
      else if (/^\d/.test(value)) errorMsg = "Email cannot start with a number.";
      else if (!value.endsWith("@gmail.com")) errorMsg = "Only @gmail.com addresses are allowed.";
    }

    if (name === "newPassword") {
      const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])/;
      if (!value) errorMsg = "Password is required.";
      else if (value.length < 6) errorMsg = "Min 6 chars.";
      else if (!passwordRegex.test(value)) errorMsg = "Need 1 number & 1 special char.";
    }

    if (name === "confirmPassword") {
      if (value !== formData.newPassword) errorMsg = "Passwords do not match.";
    }

    setErrors(prev => ({ ...prev, [name]: errorMsg }));
    return errorMsg === "";
  };

  // --- FORM-WIDE VALIDATION (For Submit) ---
  const validateForm = () => {
    const emailValid = validateField("email", formData.email);
    const passValid = validateField("newPassword", formData.newPassword);
    const confirmValid = validateField("confirmPassword", formData.confirmPassword);
    return emailValid && passValid && confirmValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error while typing
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });

    if (!validateForm()) return;

    try {
      // 1. Check User
      const usersRes = await getItems('users');
      const userExists = usersRes.data.find(u => u.email === formData.email);

      if (!userExists) {
        setStatus({ type: 'error', message: 'Email not found.' });
        return;
      }

      // 2. Check Pending
      const reqRes = await getItems('passwordRequests');
      const existingReq = reqRes.data.find(r => r.email === formData.email && r.status === 'pending');
      
      if (existingReq) {
        setStatus({ type: 'warning', message: 'Request already pending.' });
        return;
      }

      // 3. Submit
      await createItem('passwordRequests', {
        userId: userExists.id,
        userName: userExists.name,
        email: formData.email,
        newPassword: formData.newPassword,
        role: userExists.role,
        status: 'pending',
        date: new Date().toISOString().split('T')[0]
      });

      setStatus({ type: 'success', message: 'Request Sent! Redirecting...' });
      setTimeout(() => navigate('/login'), 2000);

    } catch (error) {
      console.error(error);
      setStatus({ type: 'error', message: 'Server Error.' });
    }
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', alignItems: 'center', bgcolor: '#f4f6f8' }}>
      <Container maxWidth="xs">
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3, textAlign: 'center' }}>
          
          <Box sx={{ mb: 2, color: 'primary.main' }}>
            <LockReset fontSize="large" />
          </Box>
          
          <Typography variant="h5" fontWeight="bold" mb={1}>Reset Password</Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            Enter details to request a password reset.
          </Typography>

          {status.message && <Alert severity={status.type} sx={{ mb: 2 }}>{status.message}</Alert>}

          <form onSubmit={handleSubmit}>
            <TextField 
              fullWidth 
              label="Email Address" 
              name="email"
              placeholder="example@gmail.com"
              sx={{ mb: 2 }}
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
              fullWidth 
              label="New Password" 
              name="newPassword"
              type="password" 
              placeholder="new Password"
              sx={{ mb: 2 }}
              value={formData.newPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!errors.newPassword}
              helperText={errors.newPassword}
              InputProps={{
                startAdornment: <InputAdornment position="start"><Lock color="action" /></InputAdornment>,
              }}
            />
            <TextField 
              fullWidth 
              label="Confirm Password" 
              name="confirmPassword"
              type="password" 
              placeholder='confirm Password'
              sx={{ mb: 3 }}
              value={formData.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              InputProps={{
                startAdornment: <InputAdornment position="start"><Lock color="action" /></InputAdornment>,
              }}
            />
            
            <Button type="submit" variant="contained" fullWidth size="large" sx={{ py: 1.5, fontWeight: 'bold' }}>
              Submit Request
            </Button>
          </form>

          <Box mt={3}>
            <Link href="/login" underline="hover" sx={{ fontWeight: 'medium' }}>
              Back to Login
            </Link>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default ForgotPassword;