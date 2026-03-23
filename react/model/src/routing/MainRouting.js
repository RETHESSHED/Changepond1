import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Home from "../components/home/Home";
import About from "../components/home/About";
import Placement from "../components/home/Placement";
import Departments from "../components/home/Departments";
import Contact from "../components/home/contact";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import AdminDashboard from "../components/dashboard/AdminDashboard";
import TrainerDashboard from "../components/dashboard/TrainerDashboard";
import StudentDashboard from "../components/dashboard/StudentDashboard";
import StudentList from "../components/students/StudentList";
import TrainerList from "../components/trainers/TrainerList";
import CourseList from "../components/courses/CourseList";
import BatchList from "../components/batches/BatchList";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/about", element: <About /> },
  { path: "/placement", element: <Placement /> },
  { path: "/departments", element: <Departments /> },
  { path: "/contact", element: <Contact /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },

  {
    element: <MainLayout />,
    children: [
      { path: "/admin", element: <AdminDashboard /> },
      { path: "/trainer", element: <TrainerDashboard /> },
      { path: "/student", element: <StudentDashboard /> },
      { path: "/students", element: <StudentList /> },
      { path: "/trainers", element: <TrainerList /> },
      { path: "/courses", element: <CourseList /> },
      { path: "/batches", element: <BatchList /> },
    ],
  },
]);

export default router;
