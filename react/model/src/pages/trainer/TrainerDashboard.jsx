import { Link } from "react-router-dom";

function TrainerDashboard() {
  return (
    <div className="container mt-4">
      <h2 className="mb-4">Trainer Dashboard</h2>

      <div className="row g-4">
        <div className="col-md-6">
          <div className="card shadow-sm text-center p-4">
            <h5>My Students</h5>
            <Link to="/trainer/students" className="btn btn-primary mt-3">
              View
            </Link>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card shadow-sm text-center p-4">
            <h5>My Courses</h5>
            <Link to="/trainer/courses" className="btn btn-success mt-3">
              View
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrainerDashboard;
