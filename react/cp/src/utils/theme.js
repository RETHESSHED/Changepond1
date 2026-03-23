import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#393b3f', // Charcoal (Landing Page Brand Color)
      light: '#616366',
      dark: '#0c121a',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#F59E0B', // Amber (Landing Page Highlight Color)
      light: '#FBBF24',
      dark: '#D97706',
      contrastText: '#ffffff',
    },
    background: {
      default: '#F3F4F6', // Light gray background
      paper: '#FFFFFF',
    },
    text: {
      primary: '#111827', // Near black for readability
      secondary: '#6B7280', // Slate gray
    },
    divider: '#E5E7EB',
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 800,
      letterSpacing: '-0.02em',
    },
    h5: {
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    h6: {
      fontWeight: 700,
    },
    button: {
      textTransform: 'none',
      fontWeight: 700,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          boxShadow: 'none',
          padding: '10px 20px',
        },
        containedPrimary: {
          // Dark Gradient
          background: 'linear-gradient(135deg, #393b3f 0%, #0c121a 100%)',
          '&:hover': {
            background: '#0c121a',
          },
        },
        containedSecondary: {
          // Amber Gradient (matches "Console Login" and icons)
          background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
          '&:hover': {
            background: '#D97706',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#393b3f',
          color: '#ffffff',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
          border: '1px solid #E5E7EB',
        },
      },
    },
  },
});