import React, { useEffect, useState } from 'react';
import {
  TextField,
  Button,
  Paper,
  Typography,
  Box,
  Alert,
  Autocomplete
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import { createItem, getItems, updateItem } from '../../services/api';

const AchievementForm = () => {
  const [achievement, setAchievement] = useState({
    title: '',
    description: '',
    date: '',
    email: ''
  });

  const [users, setUsers] = useState([]);
  const [globalError, setGlobalError] = useState(''); // General API errors
  const [errors, setErrors] = useState({}); // Field-specific validation errors

  const { id } = useParams();
  const navigate = useNavigate();

  // 1. Fetch Users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getItems('users');
        setUsers(res.data);
      } catch (err) {
        console.error("Error fetching users", err);
      }
    };
    fetchUsers();
  }, []);

  // 2. Fetch Achievement if Editing
  useEffect(() => {
    if (id) {
      getItems('achievements').then(res => {
        const found = res.data.find(a => a.id === parseInt(id));
        if (found) setAchievement(found);
      });
    }
  }, [id]);

  // --- VALIDATION LOGIC ---
  const validateField = (name, value) => {
    let errorMsg = "";

    switch (name) {
      case "email":
        if (!value) {
          errorMsg = "User email is required.";
        } else {
          // Check if the typed/selected email actually exists in the users list
          const userExists = users.find(u => u.email.toLowerCase() === value.toLowerCase());
          if (!userExists) errorMsg = "Please select a valid user from the list.";
        }
        break;
      case "title":
        if (!value.trim()) errorMsg = "Title is required.";
        break;
      case "description":
        if (!value.trim()) errorMsg = "Description is required.";
        break;
      case "date":
        if (!value) errorMsg = "Date is required.";
        break;
      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
    return errorMsg === "";
  };

  const validateForm = () => {
    const isEmailValid = validateField("email", achievement.email);
    const isTitleValid = validateField("title", achievement.title);
    const isDescValid = validateField("description", achievement.description);
    const isDateValid = validateField("date", achievement.date);
    return isEmailValid && isTitleValid && isDescValid && isDateValid;
  };

  // --- HANDLERS ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAchievement({ ...achievement, [name]: value });
    // Clear error on type
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGlobalError('');

    if (!validateForm()) return;

    const foundUser = users.find(
      u => u.email.toLowerCase() === achievement.email.toLowerCase()
    );

    // Double check (redundant but safe)
    if (!foundUser) {
      setGlobalError("User not found. Please try again.");
      return;
    }

    const newAchievement = {
      ...achievement,
      userId: foundUser.id,
      name: foundUser.name,
      role: foundUser.role
    };

    try {
      if (id) {
        await updateItem('achievements', id, newAchievement);
      } else {
        await createItem('achievements', newAchievement);
      }
      navigate('/admin/achievements');
    } catch (err) {
      setGlobalError("Failed to save achievement.");
    }
  };

  return (
    <MainLayout>
      <Paper sx={{ p: 4, borderRadius: 4, maxWidth: 600, mx: 'auto' }}>
        <Typography variant="h5" fontWeight="700" mb={3}>
          {id ? 'Edit Achievement' : 'Create Achievement'}
        </Typography>

        {globalError && <Alert severity="error" sx={{ mb: 2 }}>{globalError}</Alert>}

        <Box component="form" onSubmit={handleSubmit} noValidate>

          <Autocomplete
            options={users}
            getOptionLabel={(option) => option.email}
            value={users.find(u => u.email === achievement.email) || null}
            onChange={(event, newValue) => {
              const email = newValue ? newValue.email : '';
              setAchievement({ ...achievement, email });
              if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
            }}
            // Custom Option Rendering
            renderOption={(props, option) => (
              <li {...props} key={option.id}>
                {option.email} — {option.name} ({option.role})
              </li>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Student / Trainer Email"
                name="email"
                sx={{ mb: 2 }}
                required
                onBlur={() => validateField("email", achievement.email)}
                error={!!errors.email}
                helperText={errors.email}
              />
            )}
          />

          <TextField
            fullWidth
            label="Title"
            name="title"
            value={achievement.title}
            onChange={handleChange}
            onBlur={handleBlur}
            sx={{ mb: 2 }}
            required
            error={!!errors.title}
            helperText={errors.title}
          />

          <TextField
            fullWidth
            label="Description"
            name="description"
            value={achievement.description}
            onChange={handleChange}
            onBlur={handleBlur}
            multiline
            rows={3}
            sx={{ mb: 2 }}
            required
            error={!!errors.description}
            helperText={errors.description}
          />

          <TextField
            fullWidth
            type="date"
            name="date"
            label="Date of Achievement"
            value={achievement.date}
            onChange={handleChange}
            onBlur={handleBlur}
            sx={{ mb: 3 }}
            InputLabelProps={{ shrink: true }}
            required
            error={!!errors.date}
            helperText={errors.date}
          />

          <Button type="submit" variant="contained" fullWidth size="large">
            {id ? 'Update Achievement' : 'Create Achievement'}
          </Button>

        </Box>
      </Paper>
    </MainLayout>
  );
};

export default AchievementForm;