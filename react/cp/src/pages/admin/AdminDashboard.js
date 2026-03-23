import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Grid, Paper, Typography, Box, Button, IconButton, Divider, LinearProgress, Stack, Avatar 
} from '@mui/material';
import { 
  People, Class, School, SupervisorAccount, ArrowForward, 
  PersonAdd, PostAdd, AddCircleOutline, AccessTime as ClockIcon, TrendingUp 
} from '@mui/icons-material';
import MainLayout from '../../components/layout/MainLayout';
import { getItems } from '../../services/api';
import EmojiEvents from '@mui/icons-material/EmojiEvents';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { FormControl, Select, MenuItem } from '@mui/material';
import { Legend } from 'recharts';


const StatCard = ({ title, count, icon, color, link }) => {
  const navigate = useNavigate();
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3, height: '100%', borderRadius: 4, position: 'relative', overflow: 'hidden',
        border: '1px solid', borderColor: 'divider', transition: 'all 0.3s ease', cursor: 'pointer',
        background: 'linear-gradient(145deg, #ffffff 0%, #f9fafb 100%)',
        '&:hover': { transform: 'translateY(-5px)', boxShadow: `0 10px 30px -10px ${color}66`, borderColor: color }
      }}
      onClick={() => navigate(link)}
    >
      <Box sx={{ position: 'relative', zIndex: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ bgcolor: `${color}15`, color: color, p: 1.5, borderRadius: 3, display: 'inline-flex' }}>
            {React.cloneElement(icon, { fontSize: "medium" })}
          </Box>
          <IconButton size="small" sx={{ color: 'text.secondary', '&:hover': { color: color } }}>
            <ArrowForward fontSize="small" />
          </IconButton>
        </Box>
        <Typography variant="h4" fontWeight="800" sx={{ color: '#1f2937', mb: 0.5 }}>{count}</Typography>
        <Typography variant="body2" fontWeight="600" color="text.secondary">{title}</Typography>
      </Box>
      <Box sx={{ position: 'absolute', right: -20, bottom: -20, opacity: 0.05, transform: 'rotate(-15deg) scale(4)', color: color, pointerEvents: 'none', zIndex: 1 }}>
        {icon}
      </Box>
    </Paper>
  );
};


const QuickAction = ({ title, icon, color, onClick }) => (
  <Button
    variant="outlined" fullWidth startIcon={icon} onClick={onClick}
    sx={{
      p: 2, justifyContent: 'flex-start', borderRadius: 3, borderColor: 'divider',
      color: 'text.primary', bgcolor: 'white', boxShadow: '0 2px 5px rgba(0,0,0,0.02)',
      '&:hover': { borderColor: color, bgcolor: `${color}08`, transform: 'translateX(5px)' },
      transition: 'all 0.2s'
    }}
  >
    <Box sx={{ textAlign: 'left' }}><Typography variant="subtitle2" fontWeight="700">{title}</Typography></Box>
  </Button>
);



const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ students: 0, trainers: 0, courses: 0, batches: 0, achievements: 0});
  const [courseDist, setCourseDist] = useState([]); 
  const [chartType, setChartType] = useState('bar');
  const [overviewData, setOverviewData] = useState([]);
  const [activities, setActivities] = useState([]);

   useEffect(() => {
     loadActivities();
   }, []);

   const loadActivities = async () => {
     const res = await getItems("activityLogs");
     setActivities(res.data.reverse());
   };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, coursesRes, batchesRes,achievementsRes] = await Promise.all([
          getItems('users'), getItems('courses'), getItems('batches'), getItems('achievements')
        ]);
        
        const users = usersRes.data;
        const students = users.filter(u => u.role === 'student');

        setStats({
          students: students.length,
          trainers: users.filter(u => u.role === 'trainer').length,
          courses: coursesRes.data.length,
          batches: batchesRes.data.length,
          achievements: achievementsRes.data.length
        });

        const chartData = [
   { name: 'Students', value: students.length, color: '#0ea5e9' },
  { name: 'Trainers', value: users.filter(u => u.role === 'trainer').length, color: '#f59e0b' },
  { name: 'Courses', value: coursesRes.data.length, color: '#8b5cf6' },
  { name: 'Batches', value: batchesRes.data.length, color: '#10b981' },
];
setOverviewData(chartData);


        // --- CALCULATE COURSE SUMMARY ---
        const dist = { 'Full Stack': 0, 'Java': 0, 'Python': 0, 'UI/UX': 0, 'Data Science': 0 };
        students.forEach(s => {
          const course = s.enrolledCourse?.toLowerCase() || "";
          if(course.includes('full stack')) dist['Full Stack']++;
          else if(course.includes('java')) dist['Java']++;
          else if(course.includes('python')) dist['Python']++;
          else if(course.includes('ui')) dist['UI/UX']++;
          else if(course.includes('data')) dist['Data Science']++;
        });

        const distArray = [
          { name: 'Full Stack Dev', count: dist['Full Stack'], color: '#0ea5e9' }, 
          { name: 'Java Dev', count: dist['Java'], color: '#f59e0b' },      
          { name: 'Python & DS', count: dist['Python'] + dist['Data Science'], color: '#10b981' }, 
          { name: 'UI/UX Design', count: dist['UI/UX'], color: '#8b5cf6' },   
        ];
        setCourseDist(distArray);

      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };
    fetchData();
  }, []);

  // --- NAVIGATION HANDLERS WITH STATE ---
  const handleQuickAction = (path) => {
    // We pass state: { openAdd: true } to tell the next page to open the dialog
    navigate(path, { state: { openAdd: true } });
  };

  return (
    <MainLayout>

      <Typography
        variant="h6"
        fontWeight="700"
        sx={{ mb: 2, color: "#374151" }}
      >
        Institute Overview
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Students"
            count={stats.students}
            icon={<People />}
            color="#0ea5e9"
            link="/admin/students"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Trainers"
            count={stats.trainers}
            icon={<SupervisorAccount />}
            color="#f59e0b"
            link="/admin/trainers"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Active Courses"
            count={stats.courses}
            icon={<School />}
            color="#8b5cf6"
            link="/admin/courses"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Scheduled Batches"
            count={stats.batches}
            icon={<Class />}
            color="#10b981"
            link="/admin/batches"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Achievements"
            count={stats.achievements}
            icon={<EmojiEvents />}
            color="#ef4444"
            link="/admin/achievements"
          />
        </Grid>
      </Grid>

      {/* 3. Lower Section */}
      <Grid container spacing={2}>
        {/* Quick Actions */}
        <Grid item xs={12} md={4}>
          <Typography
            variant="h6"
            fontWeight="700"
            sx={{ mb: 2, color: "#374151" }}
          >
            Quick Actions
          </Typography>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 4,
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <Stack spacing={2}>
              <QuickAction
                title="Register New Student"
                icon={<PersonAdd sx={{ color: "#0ea5e9" }} />}
                color="#0ea5e9"
                onClick={() => handleQuickAction("/admin/students")}
              />
              <QuickAction
                title="Create New Batch"
                icon={<AddCircleOutline sx={{ color: "#10b981" }} />}
                color="#10b981"
                onClick={() => handleQuickAction("/admin/batches")}
              />
              <QuickAction
                title="Add New Course"
                icon={<PostAdd sx={{ color: "#8b5cf6" }} />}
                color="#8b5cf6"
                onClick={() => handleQuickAction("/admin/courses")}
              />
            </Stack>
          </Paper>
        </Grid>

        {/* --- SYSTEM STATUS / ENROLLMENT SUMMARY --- */}
        <Grid item xs={12} md={8}>
          <Grid container spacing={2}>
            {/* LEFT - Enrollment Summary */}
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography
                  variant="h6"
                  fontWeight="700"
                  sx={{ color: "#374151" }}
                >
                  Enrollment Summary
                </Typography>
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    bgcolor: "#e0f2fe",
                    color: "#0ea5e9",
                  }}
                >
                  <TrendingUp fontSize="small" />
                </Avatar>
              </Box>

              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 4,
                  border: "1px solid",
                  borderColor: "divider",
                }}
              >
                <Stack spacing={3}>
                  {courseDist.map((item) => (
                    <Box key={item.name}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          mb: 1,
                        }}
                      >
                        <Typography variant="body2" fontWeight="700">
                          {item.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          fontWeight="700"
                          sx={{ color: item.color }}
                        >
                          {item.count} Students
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={
                          stats.students > 0
                            ? (item.count / stats.students) * 100
                            : 0
                        }
                        sx={{
                          height: 8,
                          borderRadius: 5,
                          bgcolor: `${item.color}22`,
                          "& .MuiLinearProgress-bar": { bgcolor: item.color },
                        }}
                      />
                    </Box>
                  ))}
                </Stack>
              </Paper>
            </Grid>

            {/* RIGHT - Institute Overview Chart */}
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography
                  variant="h6"
                  fontWeight="700"
                  sx={{ color: "#374151" }}
                >
                  Charts
                </Typography>

                <FormControl size="small">
                  <Select
                    value={chartType}
                    onChange={(e) => setChartType(e.target.value)}
                  >
                    <MenuItem value="pie">Pie Chart</MenuItem>
                    <MenuItem value="bar">Bar Chart</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 4,
                  border: "1px solid",
                  borderColor: "divider",
                  height: 300,
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  {chartType === "pie" && (
                    <PieChart>
                      <Pie
                        data={overviewData}
                        dataKey="value"
                        nameKey="name"
                        outerRadius={100}
                        label
                      >
                        {overviewData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>

                      <Tooltip />

                     
                    </PieChart>
                  )}

                  {chartType === "bar" && (
                    <BarChart data={overviewData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend /> 
                      <Bar dataKey="value">
                        {overviewData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  )}
                </ResponsiveContainer>
                <Box sx={{ mt: 2 }}>
                  <Grid container spacing={2}>
                    {overviewData.map((item, index) => (
                      <Grid item xs={6} key={index}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            p: 1.5,
                            borderRadius: 2,
                            bgcolor: "#f9fafb",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <Box
                              sx={{
                                width: 12,
                                height: 12,
                                borderRadius: "50%",
                                bgcolor: item.color,
                              }}
                            />
                            <Typography variant="body2" fontWeight="600">
                              {item.name}
                            </Typography>
                          </Box>

                          <Typography variant="body2" fontWeight="700">
                            {item.value}
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Paper sx={{ p: 3, mt: 4 }}>
        <Typography variant="h6" fontWeight={700} gutterBottom>
          Recent Activities
        </Typography>

        {activities.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            No activities yet.
          </Typography>
        ) : (
          activities.map((act) => (
            <Typography key={act.id} variant="body2" sx={{ mt: 1 }}>
              • {act.message}
            </Typography>
          ))
        )}
      </Paper>
    </MainLayout>
  );
};

export default AdminDashboard;