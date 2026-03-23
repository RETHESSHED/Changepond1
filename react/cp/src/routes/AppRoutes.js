import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '../components/common/ProtectedRoute';

// Public Pages
import LandingPage from '../pages/LandingPage';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import ForgotPassword from '../pages/auth/ForgotPassword';

// Admin Pages
import AdminStudents from '../pages/admin/AdminStudents';
import AdminTrainers from '../pages/admin/AdminTrainers';
import AdminCourses from '../pages/admin/AdminCourses';
import AdminBatches from '../pages/admin/AdminBatches';
import AdminDashboard from '../pages/admin/AdminDashboard';
// Achievement Pages (Assuming these are saved in pages/admin or similar)
import AchievementsList from '../pages/admin/AchievementsList'; 
import AchievementForm from '../pages/admin/AchievementForm';
import AdminRequests from '../pages/admin/AdminRequests';

// Trainer Pages
import TrainerDashboard from '../pages/trainer/TrainerDashboard';
import TrainerStudents from '../pages/trainer/TrainerStudents';
import TrainerCourses from '../pages/trainer/TrainerCourses';

// Student Pages
import StudentDashboard from '../pages/student/StudentDashboard';
import StudentCourses from '../pages/student/StudentCourses';

import ChangePassword from '../pages/ChangePassword';





const AppRoutes = () => {
  return (
    <Routes>
      {/* --- PUBLIC ROUTES --- */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* --- ADMIN ROUTES --- */}
      <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/students" element={<ProtectedRoute allowedRoles={['admin']}><AdminStudents /></ProtectedRoute>} />
      <Route path="/admin/trainers" element={<ProtectedRoute allowedRoles={['admin']}><AdminTrainers /></ProtectedRoute>} />
      <Route path="/admin/courses" element={<ProtectedRoute allowedRoles={['admin']}><AdminCourses /></ProtectedRoute>} />
      <Route path="/admin/batches" element={<ProtectedRoute allowedRoles={['admin']}><AdminBatches /></ProtectedRoute>} />
      
      {/* Admin Achievement Routes */}
      <Route path="/admin/achievements" element={<ProtectedRoute allowedRoles={['admin']}><AchievementsList /></ProtectedRoute>} />
      <Route path="/admin/achievements/create" element={<ProtectedRoute allowedRoles={['admin']}><AchievementForm /></ProtectedRoute>} />
      <Route path="/admin/achievements/edit/:id" element={<ProtectedRoute allowedRoles={['admin']}><AchievementForm /></ProtectedRoute>} />

      {/* --- TRAINER ROUTES --- */}
      <Route path="/trainer/dashboard" element={<ProtectedRoute allowedRoles={['trainer']}><TrainerDashboard /></ProtectedRoute>} />
      <Route path="/trainer/students" element={<ProtectedRoute allowedRoles={['trainer']}><TrainerStudents /></ProtectedRoute>} />
      <Route path="/trainer/courses" element={<ProtectedRoute allowedRoles={['trainer']}><TrainerCourses /></ProtectedRoute>} />
      
      {/* Trainer Achievement Route */}
      <Route path="/trainer/achievements" element={<ProtectedRoute allowedRoles={['trainer']}><AchievementsList /></ProtectedRoute>} />

      {/* --- STUDENT ROUTES --- */}
      <Route path="/student/dashboard" element={<ProtectedRoute allowedRoles={['student']}><StudentDashboard /></ProtectedRoute>} />
      <Route path="/student/courses" element={<ProtectedRoute allowedRoles={['student']}><StudentCourses /></ProtectedRoute>} />
      
      <Route path="/student/achievements" element={<ProtectedRoute allowedRoles={['student']}><AchievementsList /></ProtectedRoute>} />
       


       <Route 
        path="/change-password" 
        element={
          <ProtectedRoute allowedRoles={['admin', 'trainer', 'student']}>
            <ChangePassword/>
          </ProtectedRoute>
        } 
      />
      {/* Default Redirect */}
      <Route path="*" element={<Navigate to="/" />} />

      <Route path="/forgot-password" element={<ForgotPassword />} />

       <Route path="/admin/requests" element={<ProtectedRoute allowedRoles={['admin']}><AdminRequests /></ProtectedRoute>} />
    </Routes>
    
  );
};

export default AppRoutes;