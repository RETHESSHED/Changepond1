import React, { useState, useContext } from 'react';
import { 
  Box, Typography, TextField, Button, Paper, Alert, Stack, InputAdornment 
} from '@mui/material';
import { LockReset, Lock, Key } from '@mui/icons-material';
import MainLayout from '../components/layout/MainLayout';
import { AuthContext } from '../context/AuthContext';
import { updateItem } from '../services/api';

const ChangePassword = () => {
  const { user, updateUser } = useContext(AuthContext);
  
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [status, setStatus] = useState({ type: '', message: '' });
  const [errors, setErrors] = useState({}); // Store validation errors

  // --- VALIDATION LOGIC ---
  const validateField = (name, value) => {
    let errorMsg = "";

    switch (name) {
      case "currentPassword":
        if (!value) errorMsg = "Current password is required.";
        break;
      case "newPassword":
        const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])/;
        if (!value) errorMsg = "New password is required.";
        else if (value.length < 6) errorMsg = "Must be at least 6 characters.";
        else if (!passwordRegex.test(value)) errorMsg = "Must contain a number and special char.";
        break;
      case "confirmPassword":
        if (!value) errorMsg = "Confirm password is required.";
        else if (value !== formData.newPassword) errorMsg = "Passwords do not match.";
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
    const isCurrentValid = validateField("currentPassword", formData.currentPassword);
    const isNewValid = validateField("newPassword", formData.newPassword);
    const isConfirmValid = validateField("confirmPassword", formData.confirmPassword);
    return isCurrentValid && isNewValid && isConfirmValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });

    // 1. Run Input Validation
    if (!validateForm()) return;

    // 2. Logic Check: Current Password
    // Note: In a real app, the backend handles this check securely. 
    // Here we check against the context user object for the mock.
    if (formData.currentPassword !== user.password) {
      setStatus({ type: 'error', message: 'Incorrect current password.' });
      return;
    }

    try {
      // 3. API Update
      const updatedUser = { ...user, password: formData.newPassword };
      await updateItem('users', user.id, updatedUser);
      
      // 4. Context Update
      updateUser({ password: formData.newPassword });

      setStatus({ type: 'success', message: 'Password changed successfully!' });
      setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setErrors({}); // Clear any remaining errors

    } catch (error) {
      setStatus({ type: 'error', message: 'Failed to update password. Try again.' });
    }
  };

  return (
    <MainLayout>
      <Box sx={{ maxWidth: 500, mx: 'auto', mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 1 }}>
            <LockReset color="primary" fontSize="large" />
            <Typography variant="h5" fontWeight="bold">
              Change Password
            </Typography>
          </Box>

          {status.message && (
            <Alert severity={status.type} sx={{ mb: 3 }}>
              {status.message}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                label="Current Password"
                name="currentPassword"
                type="password"
                placeholder='Current Password'
                fullWidth
                value={formData.currentPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!errors.currentPassword}
                helperText={errors.currentPassword}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><Key color="action" /></InputAdornment>,
                }}
              />
              <TextField
                label="New Password"
                name="newPassword"
                type="password"
                fullWidth
                placeholder="New Password"
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
                label="Confirm New Password"
                name="confirmPassword"
                type="password"
                placeholder='Confirm Password'
                fullWidth
                value={formData.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><Lock color="action" /></InputAdornment>,
                }}
              />
              <Button 
                type="submit" 
                variant="contained" 
                size="large" 
                fullWidth
                sx={{ mt: 2 }}
              >
                Update Password
              </Button>
            </Stack>
          </form>
        </Paper>
      </Box>
    </MainLayout>
  );
};

export default ChangePassword;