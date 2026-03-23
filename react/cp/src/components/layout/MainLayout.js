import React, { useState, useContext, useEffect } from 'react';
import { Box, AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, Avatar, Menu, MenuItem, useMediaQuery } from '@mui/material';
import { Menu as MenuIcon, Dashboard, People, School, Class, Person, Logout, Lock } from '@mui/icons-material'; 
import { useTheme } from '@mui/material/styles';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import EmojiEvents from '@mui/icons-material/EmojiEvents';
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Badge, MenuItem as MuiMenuItem } from "@mui/material";
import { getItems, updateItem } from "../../services/api";


const drawerWidth = 240;

const MainLayout = ({ children }) => {
  const { user, logout } = useContext(AuthContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [notifAnchor, setNotifAnchor] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  useEffect(() => {
    if (user) {
      loadNotifications();
    }
  }, [user]);

  const loadNotifications = async () => {
    try {
      const res = await getItems(`notifications?receiverId=${user.id}`);
      setNotifications(res.data);
    } catch (err) {
      console.error("Error loading notifications", err);
    }
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if(confirmLogout) {
      logout();
      navigate('/');
    }
  };

  const getMenuItems = () => {
    if (user?.role === 'admin') {
      return [
        { text: 'Dashboard', icon: <Dashboard />, path: '/admin/dashboard' },
        { text: 'Students', icon: <People />, path: '/admin/students' },
        { text: 'Trainers', icon: <Person />, path: '/admin/trainers' },
        { text: 'Courses', icon: <School />, path: '/admin/courses' },
        { text: 'Batches', icon: <Class />, path: '/admin/batches' },
        { text: 'Achievements', icon: <EmojiEvents />, path: '/admin/achievements' },
        { text: 'Requests', icon: <NotificationsIcon />, path: '/admin/requests' }, // ADD THIS
        { text: 'Change Password', icon: <Lock />, path: '/change-password' },
      ];
    } else if (user?.role === 'trainer') {
      return [
        { text: 'Trainer Profile', icon: <Person />, path: '/trainer/dashboard' },
        { text: 'My Students', icon: <People />, path: '/trainer/students' },
        { text: 'My Courses', icon: <School />, path: '/trainer/courses' },
        { text: 'Achievements', icon: <EmojiEvents />, path: '/trainer/achievements' },
        { text: 'Change Password', icon: <Lock />, path: '/change-password' }, // ✅ Added
      ];
    } else {
      return [
        { text: 'Student Profile', icon: <Person />, path: '/student/dashboard' },
        { text: 'My Courses', icon: <School />, path: '/student/courses' },
        { text: 'Achievements', icon: <EmojiEvents />, path: '/student/achievements' },
        { text: 'Change Password', icon: <Lock />, path: '/change-password' }, // ✅ Added
      ];
    }
  };

  const drawerContent = (
    <Box sx={{ height: "100%", bgcolor: "primary.main", color: "white" }}>
      <Toolbar>
        <Typography variant="h6" noWrap>
          Course Mgmt
        </Typography>
      </Toolbar>
      <List style={{ cursor: "pointer" }}>
        {getMenuItems().map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => navigate(item.path)}
            selected={location.pathname === item.path}
            sx={{
              bgcolor:
                location.pathname === item.path
                  ? "rgba(255,255,255,0.2)"
                  : "transparent",
              "&:hover": { bgcolor: "rgba(255,255,255,0.1)" },
            }}
          >
            <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          bgcolor: "white",
          color: "text.primary",
          boxShadow: 1,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
            {user?.role === "admin"
              ? "Admin Dashboard"
              : user?.role === "trainer"
                ? "Trainer Portal"
                : "Student Portal"}
          </Typography>
          <IconButton onClick={(e) => setNotifAnchor(e.currentTarget)}>
            <Badge badgeContent={unreadCount} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <Menu
            anchorEl={notifAnchor}
            open={Boolean(notifAnchor)}
            onClose={() => setNotifAnchor(null)}
          >
            {notifications.length === 0 ? (
              <MuiMenuItem>No Notifications</MuiMenuItem>
            ) : (
              notifications.map((notif) => (
                <MuiMenuItem
                  key={notif.id}
                  onClick={async () => {
                    if (!notif.isRead) {
                      await updateItem("notifications", notif.id, {
                        ...notif,
                        isRead: true,
                      });
                      loadNotifications();
                    }
                  }}
                  sx={{ whiteSpace: "normal", maxWidth: 300 }}
                >
                  {notif.message}
                </MuiMenuItem>
              ))
            )}
          </Menu>

          <Box
            sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
            onClick={handleMenuOpen}
          >
            <Typography sx={{ mr: 1, fontWeight: 600 }}>
              {user?.name}
            </Typography>
            <Avatar
              src="/broken-image.jpg"
              alt={user?.name}
              sx={{ bgcolor: "secondary.main" }}
            />
          </Box>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawerContent}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawerContent}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          bgcolor: "background.default",
          minHeight: "100vh",
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default MainLayout;