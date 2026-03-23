import React, { useState, useEffect, useContext } from 'react';
import { 
  Grid, Card, CardContent, Typography, Box, LinearProgress, 
  Chip, TextField, InputAdornment, IconButton 
} from '@mui/material';
import { School, AccessTime, Search, Close } from '@mui/icons-material';
import { getItems } from '../../services/api';
import { AuthContext } from '../../context/AuthContext'; // Import AuthContext
import MainLayout from '../../components/layout/MainLayout';

const TrainerCourses = () => {
  const { user } = useContext(AuthContext); // Get logged-in trainer
  const [myCourses, setMyCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (user) {
      loadCourses();
    }
  }, [user]);

  const loadCourses = async () => {
    try {
      const response = await getItems('courses');
      const allCourses = response.data;

      // --- SMART FILTERING LOGIC ---
      // Check which courses match the trainer's assigned batch prefixes
      // Example: If trainer has "FS-01", show "Full Stack Web Development"
      
      if (!user.assignedBatches || user.assignedBatches.length === 0) {
        setMyCourses([]);
        return;
      }

      const trainerCourseList = allCourses.filter(course => {
        // Define mapping logic based on your Batch Naming Convention
        const isFullStack = user.assignedBatches.some(b => b.startsWith('FS')) && course.name.includes("Full Stack");
        const isPython = user.assignedBatches.some(b => b.startsWith('PY')) && course.name.includes("Python");
        const isJava = user.assignedBatches.some(b => b.startsWith('JA')) && course.name.includes("Java");
        const isUI = user.assignedBatches.some(b => b.startsWith('UI')) && course.name.includes("UI");
        const isDS = user.assignedBatches.some(b => b.startsWith('DS')) && course.name.includes("Data Science");

        return isFullStack || isPython || isJava || isUI || isDS;
      });

      setMyCourses(trainerCourseList);
    } catch (error) {
      console.error("Error loading courses");
    }
  };

  // --- SEARCH FILTER LOGIC ---
  const filteredCourses = myCourses.filter((course) => {
    const query = searchQuery.toLowerCase();
    return (
      course.name?.toLowerCase().includes(query) ||
      course.duration?.toLowerCase().includes(query)
    );
  });

  return (
    <MainLayout>
      {/* Header & Search Section */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'center', mb: 4, gap: 2 }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 800, color: 'primary.main' }}>
            My Courses
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Manage curriculum for your assigned tracks: 
            {user?.assignedBatches?.map(b => (
               <Chip key={b} label={b} size="small" sx={{ ml: 1, fontWeight: 600 }} />
            ))}
          </Typography>
        </Box>

        <TextField
          size="small"
          placeholder="Search your courses..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ minWidth: 320, bgcolor: 'white' }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search color="action" />
              </InputAdornment>
            ),
            endAdornment: searchQuery && (
              <InputAdornment position="end">
                <IconButton size="small" onClick={() => setSearchQuery("")}>
                  <Close fontSize="small" />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
      </Box>

      {/* Results Count */}
      <Typography variant="caption" sx={{ mb: 2, display: 'block', color: 'text.secondary' }}>
        Showing {filteredCourses.length} active courses
      </Typography>

      <Grid container spacing={3}>
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <Grid item xs={12} sm={6} md={4} key={course.id}>
              <Card 
                sx={{ 
                  height: '100%', 
                  borderRadius: 4, 
                  border: '1px solid #E5E7EB',
                  transition: '0.3s',
                  '&:hover': { 
                    transform: 'translateY(-5px)',
                    boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                    borderColor: 'secondary.main'
                  } 
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                    <Box 
                      sx={{ 
                        p: 1.5, 
                        borderRadius: 3, 
                        bgcolor: 'rgba(245, 158, 11, 0.1)', 
                        color: 'secondary.main', 
                        mr: 2 
                      }}
                    >
                      <School fontSize="large" />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6" fontWeight="800" sx={{ lineHeight: 1.2, mb: 0.5 }}>
                        {course.name}
                      </Typography>
                      <Chip 
                        icon={<AccessTime sx={{ fontSize: '14px !important' }} />} 
                        label={course.duration} 
                        size="small" 
                        sx={{ fontWeight: 600 }}
                      />
                    </Box>
                  </Box>
                  
                  <Box sx={{ mt: 4 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="caption" fontWeight="700" color="textSecondary">
                        CURRICULUM PROGRESS
                      </Typography>
                      <Typography variant="caption" fontWeight="900" color="secondary.main">
                        75%
                      </Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={75} 
                      sx={{ 
                        height: 8, 
                        borderRadius: 5, 
                        bgcolor: '#f0f0f0',
                        '& .MuiLinearProgress-bar': {
                          bgcolor: 'secondary.main', 
                          borderRadius: 5
                        }
                      }} 
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Box sx={{ textAlign: 'center', py: 10 }}>
              <Typography color="textSecondary">You are not assigned to any active courses yet.</Typography>
            </Box>
          </Grid>
        )}
      </Grid>
    </MainLayout>
  );
};

export default TrainerCourses;