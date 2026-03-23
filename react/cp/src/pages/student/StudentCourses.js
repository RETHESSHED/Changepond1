import React, { useContext } from 'react';
import { 
  Card, CardContent, Typography, Box, Chip, Button, Grid, Paper 
} from '@mui/material';
import { PlayCircleFilled, Description, MenuBook } from '@mui/icons-material';
import { AuthContext } from '../../context/AuthContext';
import MainLayout from '../../components/layout/MainLayout';

const StudentCourses = () => {
  const { user } = useContext(AuthContext);

  return (
    <MainLayout>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>My Learning</Typography>
      
      {user.enrolledCourse ? (
        <Card sx={{ mb: 4, borderRadius: 3, boxShadow: 3, overflow: 'visible' }}>
          <Box sx={{ bgcolor: '#1565C0', p: 3, color: 'white', borderRadius: '12px 12px 0 0' }}>
            <Typography variant="caption" sx={{ opacity: 0.8 }}>CURRENTLY LEARNING</Typography>
            <Typography variant="h4" fontWeight="bold" sx={{ mt: 1 }}>{user.enrolledCourse}</Typography>
            <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
               <Chip label={`Batch: ${user.batchName}`} sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }} />
               <Chip label="In Progress" sx={{ bgcolor: '#4CAF50', color: 'white' }} />
            </Box>
          </Box>

          <CardContent sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
              <Box>
                <Typography variant="h6">Course Progress</Typography>
                <Typography variant="body2" color="textSecondary">You are doing great! Keep it up.</Typography>
              </Box>
              <Button variant="contained" size="large" startIcon={<PlayCircleFilled />} sx={{ borderRadius: 5, px: 4 }}>
                Continue
              </Button>
            </Box>
            
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Syllabus</Typography>
            <Grid container spacing={2}>
               {['Introduction & Setup', 'React Hooks Deep Dive', 'Routing & Navigation', 'API Integration & Axios', 'State Management', 'Deployment'].map((topic, index) => (
                 <Grid item xs={12} md={6} key={index}>
                   <Paper variant="outlined" sx={{ p: 2, display: 'flex', alignItems: 'center', borderRadius: 2 }}>
                      <MenuBook color="primary" sx={{ mr: 2, opacity: 0.7 }} />
                      <Typography fontWeight={500}>Module {index + 1}: {topic}</Typography>
                   </Paper>
                 </Grid>
               ))}
            </Grid>
          </CardContent>
        </Card>
      ) : (
        <Paper sx={{ p: 5, textAlign: 'center' }}>
          <Typography variant="h6" color="textSecondary">You are not enrolled in any course yet.</Typography>
          <Typography variant="body2">Please contact your administrator.</Typography>
        </Paper>
      )}
    </MainLayout>
  );
};

export default StudentCourses;