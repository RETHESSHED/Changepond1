import { Link } from "react-router-dom";

function StudentDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Welcome, {user.studentname}</h2>

      <div className="row g-4">
        <div className="col-md-6">
          <div className="card shadow-sm p-4">
            <h5>My Profile</h5>
            <p>View and update your details.</p>
            <Link to="/student/profile" className="btn btn-primary">
              Open
            </Link>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card shadow-sm p-4">
            <h5>My Courses</h5>
            <p>See enrolled courses.</p>
            <Link to="/student/courses" className="btn btn-success">
              Open
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
