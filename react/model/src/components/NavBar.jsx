import { Link, useNavigate } from "react-router-dom";
import Login from "../pages/auth/Login";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">RoleApp</Link>

        {user && (
          <div className="collapse navbar-collapse d-flex justify-content-between align-items-center">
            <ul className="navbar-nav me-auto">
              {user.role === "admin" && (
                <>
                  <li className="nav-item"><Link className="nav-link" to="/admin">Dashboard</Link></li>
                  <li className="nav-item"><Link className="nav-link" to="/admin/students">Students</Link></li>
                  <li className="nav-item"><Link className="nav-link" to="/admin/trainers">Trainers</Link></li>
                  <li className="nav-item"><Link className="nav-link" to="/admin/courses">Courses</Link></li>
                </>

              )}
                {user.role === "trainer" && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/trainer">
                        Dashboard
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/trainer/students">
                        Students
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/trainer/courses">
                        Courses
                      </Link>
                    </li>
                  </>
                )}

                {user.role === "student" && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/student">
                        Dashboard
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/student/profile">
                        Profile
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/student/courses">
                        Courses
                      </Link>
                    </li>
                  </>
                )}
              </ul>       

<div className="d-flex gap-2">
  <li className="nav-item">
  <Link className="btn btn-outline-danger btn-sm px-3" to="/achievements">
    Achievements
  </Link>
</li>

  {/* <!-- Notification Button --> */}
  <button type="button" className="btn btn-outline-danger btn-sm px-3" >
    Notification
    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
      2
      <span className="visually-hidden">unread messages</span>
    </span>
  </button>


              <button className="btn btn-outline-danger btn-sm px-3" onClick={handleLogout}>
                Logout
              </button>
              </div>
            </div>
          
        )}
      </div>
    </nav>
  );
}

export default Navbar;
