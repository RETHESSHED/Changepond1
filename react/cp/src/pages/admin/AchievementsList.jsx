import React, { useEffect, useState, useContext } from 'react';
import {
  Typography, Grid, Card, CardContent, Box, Button, IconButton, 
  Stack, TextField, InputAdornment, Chip, Avatar, Divider, Paper
} from '@mui/material';
import { 
  Edit, Delete, Add, Search, Close, EmojiEvents, 
  Person, CalendarToday, Star, WorkspacePremium
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import { getItems, deleteItem } from '../../services/api';
import { AuthContext } from '../../context/AuthContext';

const AchievementsList = () => {
  const { user } = useContext(AuthContext); 
  const [achievements, setAchievements] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const fetchAchievements = async () => {
    try {
      const res = await getItems('achievements');
      setAchievements(res.data);
    } catch (error) {
      console.error("Error fetching achievements:", error);
    }
  };

  useEffect(() => {
    fetchAchievements();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this achievement record?")) {
      await deleteItem('achievements', id);
      fetchAchievements();
    }
  };

  const filteredAchievements = achievements.filter((item) => {
    const query = searchQuery.toLowerCase();
    return (
      item.title?.toLowerCase().includes(query) ||
      item.name?.toLowerCase().includes(query) ||
      item.role?.toLowerCase().includes(query)
    );
  });

  return (
    <MainLayout>
      {/* --- HEADER --- */}
      <Paper 
        elevation={0} 
        sx={{ 
          p: 4, mb: 5, borderRadius: 5, 
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', 
          color: 'white', position: 'relative', overflow: 'hidden'
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 2 }}>
          <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems="center" spacing={3}>
            <Box>
              <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 1 }}>
                <WorkspacePremium sx={{ color: '#fbbf24', fontSize: 35 }} />
                <Typography variant="h4" sx={{ fontWeight: 900, letterSpacing: '-1px' }}>
                  Achievements
                </Typography>
              </Stack>
              {/* <Typography variant="body1" sx={{ opacity: 0.7, maxWidth: 500 }}>
                
              </Typography> */}
            </Box>

            <Stack direction="row" spacing={2} sx={{ width: { xs: '100%', md: 'auto' } }}>
              <TextField
                size="small"
                placeholder="Search trophies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{ 
                  minWidth: { md: 280 }, 
                  bgcolor: 'rgba(255,255,255,0.05)', 
                  borderRadius: 2,
                  '& .MuiOutlinedInput-root': { color: 'white', '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' } },
                }}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><Search sx={{ color: 'rgba(255,255,255,0.5)' }} /></InputAdornment>,
                  endAdornment: searchQuery && (
                    <InputAdornment position="end">
                      <IconButton size="small" onClick={() => setSearchQuery("")}><Close fontSize="small" sx={{ color: 'white' }} /></IconButton>
                    </InputAdornment>
                  )
                }}
              />
              {user.role === 'admin' && (
                <Button 
                  variant="contained" 
                  startIcon={<Add />} 
                  onClick={() => navigate('/admin/achievements/create')}
                  sx={{ bgcolor: '#fbbf24', color: '#ffffff', fontWeight: 700, '&:hover': { bgcolor: '#f59e0b' }, px: 3 }}
                >
                  New Award
                </Button>
              )}
            </Stack>
          </Stack>
        </Box>
      
        <EmojiEvents sx={{ position: 'absolute', right: -20, bottom: -20, fontSize: 150, opacity: 0.1, color: 'white', transform: 'rotate(-15deg)' }} />
      </Paper>

   
      <Grid container spacing={4} alignItems="stretch">
        {filteredAchievements.length > 0 ? (
          filteredAchievements.map((item) => (
            <Grid item xs={12} sm={6} lg={4} key={item.id} sx={{ display: 'flex' }}>
              <Card 
                sx={{ 
                  width: '100%', display: 'flex', flexDirection: 'column',
                  borderRadius: 5, border: '1px solid #e2e8f0',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': { 
                    transform: 'translateY(-10px)', 
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                    borderColor: '#3b82f6'
                  } 
                }}
              >
                <CardContent sx={{ p: 4, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
           
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                    <Chip 
                      label={item.role?.toUpperCase()} 
                      size="small" 
                      sx={{ 
                        fontWeight: 800, fontSize: '0.65rem',
                        bgcolor: item.role === 'trainer' ? '#dcfce7' : '#dbeafe',
                        color: item.role === 'trainer' ? '#166534' : '#1e40af',
                        px: 1
                      }}
                    />
                    <Avatar sx={{ bgcolor: '#fef3c7', color: '#d97706', width: 45, height: 45 }}>
                      <EmojiEvents fontSize="medium" />
                    </Avatar>
                  </Box>

                
                  <Box sx={{ minHeight: 60, mb: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 800, color: '#1e293b', lineHeight: 1.2 }}>
                      {item.title}
                    </Typography>
                  </Box>
                  
               
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: '#64748b', mb: 3, flexGrow: 1,
                      display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', 
                      overflow: 'hidden', minHeight: '4.5em', lineHeight: 1.6
                    }}
                  >
                    {item.description}
                  </Typography>

                  <Divider sx={{ mb: 3, borderStyle: 'dashed' }} />

                  {/* Footer Section */}
                  <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Stack direction="row" alignItems="center" spacing={1.5}>
                      <Avatar sx={{ width: 32, height: 32, bgcolor: '#3b82f6', fontSize: '0.8rem', fontWeight: 700 }}>
                        {item.name?.charAt(0)}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1e293b', lineHeight: 1 }}>
                          {item.name}
                        </Typography>
                        <Stack direction="row" alignItems="center" spacing={0.5} sx={{ color: '#94a3b8', mt: 0.5 }}>
                          <CalendarToday sx={{ fontSize: 12 }} />
                          <Typography variant="caption" sx={{ fontWeight: 500 }}>
                            {new Date(item.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                          </Typography>
                        </Stack>
                      </Box>
                    </Stack>

                    {user.role === 'admin' && (
                      <Stack direction="row" spacing={1}>

                        <IconButton 
                          size="small" 
                          onClick={() => handleDelete(item.id)}
                          sx={{ bgcolor: '#fff1f2', color: '#e11d48', '&:hover': { bgcolor: '#ffe4e6' } }}
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      </Stack>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Box sx={{ textAlign: 'center', py: 12, bgcolor: '#f8fafc', borderRadius: 8, border: '2px dashed #cbd5e1' }}>
              <Star sx={{ fontSize: 70, color: '#cbd5e1', mb: 2 }} />
              <Typography variant="h5" sx={{ color: '#64748b', fontWeight: 700 }}>
                Awaiting Greatness
              </Typography>
              <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                No achievements match your search. Keep pushing for excellence!
              </Typography>
            </Box>
          </Grid>
        )}
      </Grid>
    </MainLayout>
  );
};

export default AchievementsList;