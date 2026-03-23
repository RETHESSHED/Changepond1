import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, Typography, Button, Container, Grid, Paper, AppBar, Toolbar, Stack, IconButton, Card,
  Drawer, List, ListItem, ListItemText, useMediaQuery, useTheme
} from '@mui/material';
import { 
  NavigateBefore, NavigateNext, LocationOn, Email, Phone, Star, 
  Menu as MenuIcon, Terminal, Code, CloudQueue, People, Dashboard, CheckCircle
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

import carouselimg1 from '../shared/images/curosalimg1.jpeg';
import carouselimg2 from '../shared/images/curosalimg2.jpg';
import carouselimg3 from '../shared/images/curosalimg3.jfif';

import Python from '../shared/images/python.jpg';
import React_i from '../shared/images/react.png';
import java from '../shared/images/java.jfif';
import Sql from '../shared/images/sql.png';
import DataA from '../shared/images/DataAnalysis.jpg';
import Mern from '../shared/images/mern.jpg';


const carouselImages = [
  { url: carouselimg1, title: "Modern Tech Training", subtitle: "Learn the latest industry skills from scratch." },
  { url: carouselimg2, title: "Easy Learning Path", subtitle: "Simple modules designed for every student." },
  { url: carouselimg3, title: "Career Growth", subtitle: "Get ready for top tech jobs with expert help." }
];

const techCourses = [
  { name: "Python", desc: "Build smart apps and work with Data Science.", image: Python },
  { name: "React JS", desc: "Create beautiful and fast websites.", image: React_i },
  { name: "Java", desc: "Master the foundation of enterprise software.", image: java },
  { name: "SQL", desc: "Manage and query large databases efficiently.", image: Sql },
  { name: "Data Analysis", desc: "Turn raw data into actionable insights.", image: DataA },
  { name: "MERN Stack", desc: "Full-stack development with JavaScript.", image: Mern }
];

const LandingPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [activeStep, setActiveStep] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!isHovered) {
      intervalRef.current = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % carouselImages.length);
      }, 4000); 
    }
    return () => clearInterval(intervalRef.current);
  }, [isHovered]);

  const handleNext = () => setActiveStep((prev) => (prev + 1) % carouselImages.length);
  const handleBack = () => setActiveStep((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMobileOpen(false);
  };

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* --- 1. NAVBAR --- */}
      <AppBar position="sticky" elevation={1} sx={{ bgcolor: 'primary.main', borderBottom: '1px solid', borderColor: 'divider' }}>
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, cursor: 'pointer' }} onClick={() => scrollToSection('home')}>
              <Terminal sx={{ fontSize: 32, color: 'secondary.main' }} />
              <Typography variant="h5" sx={{ color: 'primary.contrastText', fontWeight: 800 }}>
                CP <Box component="span" sx={{ color: 'secondary.main' }}>Mgmt</Box>
              </Typography>
            </Box>

            <Stack direction="row" spacing={1} sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
              <Button color="inherit" onClick={() => scrollToSection('home')} sx={{ color: 'primary.contrastText', fontWeight: 700 }}>Home</Button>
              <Button color="inherit" onClick={() => scrollToSection('about')} sx={{ color: 'primary.contrastText', fontWeight: 700 }}>About Us</Button>
              <Button color="inherit" onClick={() => scrollToSection('achievements')} sx={{ color: 'primary.contrastText', fontWeight: 700 }}>Our Impact</Button>
              <Button variant="contained" color="secondary" onClick={() => navigate('/login')} sx={{ ml: 2, px: 3, fontWeight: 700 }}>Login</Button>
            </Stack>

            <IconButton onClick={() => setMobileOpen(true)} sx={{ display: { xs: 'flex', md: 'none' }, color: 'white' }}>
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* --- 2. HERO SECTION --- */}
      <Box id="home" sx={{ py: { xs: 8, md: 12 }, textAlign: 'center', bgcolor: 'background.paper' }}>
        <Container maxWidth="md">
          
          <Typography variant="h1" sx={{ fontSize: { xs: '2.5rem', md: '4rem' }, fontWeight: 900, mt: 2, mb: 3, color: 'text.primary', lineHeight: 1.1 }}>
            Simple Learning for <Box component="span" sx={{ color: 'secondary.main' }}>Better Careers.</Box>
          </Typography>
          <Typography variant="h6" sx={{ color: 'text.secondary', mb: 5, maxWidth: '700px', mx: 'auto' }}>
            We provide easy-to-follow technical courses. Manage your learning, track your progress, and get industry-ready skills in one place.
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
            <Button variant="contained" size="large" color="primary" onClick={() => navigate('/login')} sx={{ px: 5, py: 1.5 }}>Login Now</Button>
            <Button variant="outlined" size="large" sx={{ px: 5, py: 1.5, color: 'text.primary' }} onClick={() => scrollToSection('about')}>Explore Courses</Button>
          </Stack>
        </Container>
      </Box>

      {/* --- 3. CAROUSEL --- */}
      <Container maxWidth="lg" sx={{ mt: -4, mb: 10 }}>
        <Paper elevation={3} sx={{ borderRadius: theme.shape.borderRadius, overflow: 'hidden', border: '1px solid', borderColor: 'divider' }}>
          <Box onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} sx={{ position: 'relative', height: { xs: 300, md: 500 } }}>
            {carouselImages.map((step, index) => (
              <Box key={index} sx={{ height: '100%', width: '100%', position: 'absolute', opacity: activeStep === index ? 1 : 0, transition: 'opacity 1s ease-in-out', backgroundImage: `url(${step.url})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
            ))}
            <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%', background: 'linear-gradient(transparent, rgba(0,0,0,0.8))', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', p: 4 }}>
              <Box sx={{ color: 'white' }}>
                <Typography variant="h4" sx={{ mb: 1, fontWeight: 800 }}>{carouselImages[activeStep].title}</Typography>
                <Typography variant="subtitle1" sx={{ color: 'secondary.light' }}>{carouselImages[activeStep].subtitle}</Typography>
              </Box>
            </Box>
            <IconButton onClick={handleBack} sx={{ position: 'absolute', top: '50%', left: 20, bgcolor: 'rgba(255,255,255,0.3)', color: '#000' }}><NavigateBefore /></IconButton>
            <IconButton onClick={handleNext} sx={{ position: 'absolute', top: '50%', right: 20, bgcolor: 'rgba(255,255,255,0.3)', color: '#000' }}><NavigateNext /></IconButton>
          </Box>
        </Paper>
      </Container>

      {/* --- 4. COURSE OFFERS  */}
      <Box sx={{ py: 10, bgcolor: '#fbfbfb' }}>
        <Container maxWidth="lg">
          <Typography variant="h3" textAlign="center" fontWeight="900" sx={{ mb: 6 }}>
            Popular <Box component="span" sx={{ color: 'secondary.main' }}>Tech Courses</Box>
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {techCourses.map((course, i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <Card 
                  sx={{ 
                    height: '100%', 
                    border: '1px solid #E5E7EB', 
                    textAlign: 'center', 
                    transition: '0.3s', 
                    overflow: 'hidden', 
                    '&:hover': { 
                      transform: 'translateY(-10px)',
                      boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                      borderColor: 'secondary.main'
                    } 
                  }}
                >
                  {/* Image Part */}
                  <Box sx={{ height: 180, overflow: 'hidden' }}>
                    <Box 
                      component="img" 
                      src={course.image} 
                      alt={course.name}
                      sx={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover',
                        transition: '0.5s',
                        '&:hover': { transform: 'scale(1.1)' }
                      }} 
                    />
                  </Box>

                  {/* Text Part */}
                  <Box sx={{ p: 3 }}>
                    <Typography variant="h5" fontWeight="800" gutterBottom>
                      {course.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {course.desc}
                    </Typography>
                    <Button 
                      variant="text" 
                      color="secondary" 
                      sx={{ mt: 2, fontWeight: 700 }}
                      onClick={() => navigate('/login')}
                    >
                      View Details
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

    {/* --- 5. WHY CHOOSE CP MGMT */}
      <Box 
        id="about" 
        sx={{ 
          py: { xs: 8, md: 12 }, 
          bgcolor: 'background.paper',
          width: '100%' 
        }}
      >
        <Container maxWidth="lg">
          <Box 
            sx={{ 
              display: 'flex',
              flexDirection: { xs: 'column', lg: 'row' }, 
              alignItems: 'stretch', 
              gap: { xs: 4, lg: 8 },
              width: '100%'
            }}
          >
            
            {/* LEFT PART: TEXT */}
            <Box 
              sx={{ 
                flex: 1, 
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                textAlign: { xs: 'center', lg: 'left' } 
              }}
            >
             
              <Typography variant="h3" fontWeight="900" sx={{ mb: 3, mt: 1, color: 'text.primary', lineHeight: 1.2 }}>
                Why Choose <Box component="span" sx={{ color: 'secondary.main' }}>CP Mgmt?</Box>
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4, fontSize: '1.1rem', lineHeight: 1.8 }}>
                We simplify complex technology. Our platform builds developers through expert mentorship and real-world project experience.
              </Typography>
              
              <Stack spacing={3} alignItems={{ xs: 'center', lg: 'flex-start' }}>
                {[
                  { title: 'Live Mentor Support', desc: 'Real-time doubt clearing.' },
                  { title: 'Practical Projects', desc: 'Industry-standard assignments.' },
                  { title: 'Placement Help', desc: 'Career guidance and prep.' }
                ].map((item) => (
                  <Box key={item.title} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <CheckCircle sx={{ color: 'secondary.main' }} />
                    <Box sx={{ textAlign: 'left' }}>
                      <Typography variant="subtitle1" fontWeight="800">{item.title}</Typography>
                      <Typography variant="body2" color="text.secondary">{item.desc}</Typography>
                    </Box>
                  </Box>
                ))}
              </Stack>
            </Box>

            {/* RIGHT PART: IMAGE  */}
            <Box 
              sx={{ 
                flex: 1,
                display: 'flex', 
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Paper 
                elevation={10} 
                sx={{ 
                  borderRadius: 4, 
                  overflow: 'hidden', 
                  border: '4px solid',
                  borderColor: 'secondary.main',
                  width: '100%',
                  height: '100%', 
                  display: 'flex'
                }}
              >
                <Box 
                  component="img" 
                  src={carouselimg1} 
                  alt="CP Mgmt Training"
                  sx={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover',
                    display: 'block'
                  }} 
                />
              </Paper>
            </Box>

          </Box>
        </Container>
      </Box>

      {/* --- 6. OUR TECH FOOTPRINT */}
      <Box id="achievements" sx={{ py: 12, bgcolor: 'primary.main', color: 'white' }}>
        <Container maxWidth="lg">
          <Typography variant="h3" textAlign="center" sx={{ mb: 8, fontWeight: 900 }}>
            Our Tech <Box component="span" sx={{ color: 'secondary.main' }}>Footprint</Box>
          </Typography>
          
          <Grid container spacing={4} justifyContent="center">
            {[
              { label: "Happy Students", value: "15k+", icon: <People /> },
              { label: "Expert Mentors", value: "600+", icon: <Star /> },
              { label: "Completed Projects", value: "5000+", icon: <Dashboard /> },
              { label: "Support Available", value: "24/7", icon: <CloudQueue /> }
            ].map((stat, i) => (
              <Grid item xs={12} sm={6} md={3} key={i}>
                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: 4, 
                    bgcolor: 'rgba(238, 243, 243, 0.05)', 
                    border: '1px solid rgba(255,255,255,0.1)', 
                    textAlign: 'center',
                    borderRadius: 4,
                    transition: '0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      transform: 'translateY(-15px)', 
                      bgcolor: 'rgba(239, 242, 243, 0.15)',
                      borderColor: 'secondary.main',
                      boxShadow: '0 15px 30px rgba(198, 236, 252, 0.5)',
                    }
                  }}
                >
                  <Box sx={{ color: 'secondary.main', mb: 2, fontSize: 45, display: 'flex', justifyContent: 'center' }}>
                    {stat.icon}
                  </Box>
                  <Typography variant="h4" fontWeight="900" sx={{ mb: 1 }}>{stat.value}</Typography>
                  <Typography variant="subtitle2" sx={{ opacity: 0.8, fontWeight: 700 }}>{stat.label}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

    

      {/* --- 7. FOOTER --- */}
      <Box sx={{ bgcolor: 'primary.dark', color: 'white', pt: 10, pb: 6 }}>
        <Container maxWidth="lg">
          <Grid container spacing={8} justifyContent="center" textAlign="center">
            

            <Grid item xs={12} md={4}>
              <Stack alignItems="center" spacing={2}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Terminal sx={{ fontSize: 30, color: 'secondary.main' }} />
                  <Typography variant="h5" sx={{ fontWeight: 800 }}>
                    CP <Box component="span" sx={{ color: 'secondary.main' }}>Mgmt</Box>
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ opacity: 0.7, lineHeight: 1.8, maxWidth: 300 }}>
                  Simplifying technical education and institute management for students and mentors at the heart of Siruseri's IT corridor.
                </Typography>
              </Stack>
            </Grid>

            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 700 }}>Contact Us</Typography>
              <Stack spacing={2.5} alignItems="center">
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                  <LocationOn sx={{ color: 'secondary.main' }} /> 
                  <Typography variant="body2">
                    H-2, SIPCOT IT Park, OMR, <br />
                    Siruseri, Chennai - 603103
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                  <Email sx={{ color: 'secondary.main' }} /> 
                  <Typography variant="body2">support@cpmgmt.com</Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                  <Phone sx={{ color: 'secondary.main' }} /> 
                  <Typography variant="body2">+91 44 4748 0000</Typography>
                </Box>
              </Stack>
            </Grid>

            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 700 }}>Our Campus</Typography>
              <Paper 
                elevation={6} 
                sx={{ 
                  borderRadius: 4, 
                  overflow: 'hidden', 
                  height: 220, 
                  bgcolor: '#000', 
                  maxWidth: 350, 
                  mx: 'auto',
                  border: '1px solid rgba(255,255,255,0.1)' 
                }}
              >
                <iframe 
                  title="Changepond Technologies Map" 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.3361491741635!2d80.2227129!3d12.8215905!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5259698f3d32f1%3A0x769131751ee5a50e!2sChangepond%20Technologies!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) grayscale(0.5)' }} 
                  allowFullScreen="" 
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </Paper>
            </Grid>
          </Grid>
          
          <Box sx={{ mt: 8, pt: 4, borderTop: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>
            <Typography variant="caption" sx={{ opacity: 0.4 }}>
              © 2026 CP Mgmt System. Powered by Changepond Tech Excellence.
            </Typography>
          </Box>
        </Container>
      </Box>
      <Drawer anchor="right" open={mobileOpen} onClose={() => setMobileOpen(false)}>
        <List sx={{ width: 250, pt: 5 }}>
          {['Home', 'About', 'Achievements'].map((text) => (
            <ListItem button key={text} onClick={() => scrollToSection(text === 'About' ? 'about' : text === 'Achievements' ? 'achievements' : 'home')}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};

export default LandingPage;