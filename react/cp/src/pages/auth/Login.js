import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { loginUser } from '../../services/api';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
  Box,
  Link,
  Divider,
  InputAdornment
} from '@mui/material';
import { Email, Lock } from '@mui/icons-material';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // Email Validation
  const handleEmailBlur = () => {
    if (!email) {
      setEmailError("Invalid email address");
    } else if (/^\d/.test(email)) {
      setEmailError("Invalid email address");
    } else if (!email.endsWith("@gmail.com")) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }
  };

  //  Password Validation
  const handlePasswordBlur = () => {
    if (!password) {
      setPasswordError("Password is invalid");
    } else if (!password.includes(" ") && password.length < 6) {
      setPasswordError("Password is invalid");
    } else if (!password.includes(" ") && password.length >= 6) {
      setPasswordError("");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (emailError || passwordError) return;

    try {
      const user = await loginUser(email, password);

      if (user) {
        login(user);

        if (user.role === 'admin') navigate('/admin/dashboard');
        else if (user.role === 'trainer') navigate('/trainer/dashboard');
        else navigate('/student/dashboard');
      } else {
        setError('Invalid email or password');
      }

    } catch (err) {
      setError('Connection error. Is JSON Server running?');
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#f0f2f5",
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={10}
          sx={{
            p: 5,
            borderRadius: 4,
            textAlign: "center",
            borderTop: "6px solid #F59E0B",
          }}
        >
          <Typography
            variant="h4"
            sx={{ fontWeight: 900, mb: 1, color: "#393b3f" }}
          >
            CP{" "}
            <Box component="span" sx={{ color: "#F59E0B" }}>
              Mgmt
            </Box>
          </Typography>

          <Typography variant="body2" color="textSecondary" sx={{ mb: 4 }}>
            Secure Portal Login
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleLogin}>
            {/* Email Field */}
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email Address"
              value={email}
              onChange={(e) => {
                const value = e.target.value;
                setEmail(value);

                // Immediate space validation
                if (value.includes(" ")) {
                  setEmailError("Don't use space");
                } else {
                  setEmailError("");
                }
              }}
              onBlur={handleEmailBlur}
              error={!!emailError}
              helperText={emailError}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email color="action" />
                  </InputAdornment>
                ),
              }}
            />

            {/* Password Field */}
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => {
                const value = e.target.value;
                setPassword(value);

                if (value.includes(" ")) {
                  setPasswordError("Don't use space");
                } else {
                  setPasswordError("");
                }
              }}
              onBlur={handlePasswordBlur}
              error={!!passwordError}
              helperText={passwordError}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock color="action" />
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 4,
                mb: 2,
                py: 1.5,
                fontWeight: "bold",
                borderRadius: 2,
                bgcolor: "#393b3f",
                "&:hover": { bgcolor: "#1a1b1d" },
              }}
            >
              Sign In
            </Button>

            <Box sx={{ textAlign: "right", mt: 1 }}>
              <Link
                href="/forgot-password"
                variant="body2"
                sx={{ color: "#1976d2", textDecoration: "none" }}
              >
                Forgot Password?
              </Link>
            </Box>

            <Divider sx={{ my: 3 }}>OR</Divider>

            <Typography variant="body2">
              New Student?{" "}
              <Link
                href="/register"
                sx={{
                  fontWeight: "bold",
                  color: "#F59E0B",
                  textDecoration: "none",
                }}
              >
                Register Here
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
