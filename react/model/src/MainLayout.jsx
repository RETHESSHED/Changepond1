import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/NavBar";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageStudents from "./pages/admin/ManageStudents";
import ManageTrainers from "./pages/admin/ManageTrainers";
import ManageCourses from "./pages/admin/ManageCourses";
import TrainerDashboard from "./pages/trainer/TrainerDashboard";
import TrainerStudents from "./pages/trainer/TrainerStudents";
import TrainerCourses from "./pages/trainer/TrainerCourses";
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentProfile from "./pages/student/StudentProfile";
import StudentCourses from "./pages/student/StudentCourses";
import ManageBatches from "./pages/admin/ManageBatches";
import AchievementList from "./achievements/AchievementList";
import WelcomeScreen from "./components/WelcomeScreen";

const MainLayout = () => {
   const location = useLocation();
   const user = JSON.parse(localStorage.getItem("user"));
   const hideNavbar = location.pathname === "/" || location.pathname === "/register";
  return (
    <>
      {user && !hideNavbar && <Navbar />}
      {/* <Navbar /> */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
  path="/achievements"
  element={
    <ProtectedRoute>
      <AchievementList />
    </ProtectedRoute>
  }
/>

<Route
  path="/welcome"
  element={
    <ProtectedRoute>
      <WelcomeScreen />
    </ProtectedRoute>
  }
/>

        

        {/* ADMIN */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/students"
          element={
            <ProtectedRoute role="admin">
              <ManageStudents />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/trainers"
          element={
            <ProtectedRoute role="admin">
              <ManageTrainers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/courses"
          element={
            <ProtectedRoute role="admin">
              <ManageCourses />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/batches"
          element={
            <ProtectedRoute role="admin">
              <ManageBatches />
            </ProtectedRoute>
          }
        />

        {/* TRAINER */}
        <Route
          path="/trainer"
          element={
            <ProtectedRoute role="trainer">
              <TrainerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/trainer/students"
          element={
            <ProtectedRoute role="trainer">
              <TrainerStudents />
            </ProtectedRoute>
          }
        />
        <Route
          path="/trainer/courses"
          element={
            <ProtectedRoute role="trainer">
              <TrainerCourses />
            </ProtectedRoute>
          }
        />

        {/* STUDENT */}
        <Route
          path="/student"
          element={
            <ProtectedRoute role="student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/profile"
          element={
            <ProtectedRoute role="student">
              <StudentProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/courses"
          element={
            <ProtectedRoute role="student">
              <StudentCourses />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default MainLayout;
