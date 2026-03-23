import { useEffect, useState } from "react";
import api from "../../api";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    studentname: "",
    contact: "",
    gender: "",
    mail: "",
    dob: "",
    address: "",
    qualification: "",
    password: "",
    role: "student",
  });

  useEffect(() => {
    localStorage.removeItem("user");
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/users", form);
    alert("Registered Successfully");
    navigate("/");
  };

  return (
    <div className="container mt-4">
      <div className="card p-4">
        <h3 className="text-center mb-4">Student Registration</h3>

        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <input
                name="studentname"
                className="form-control"
                placeholder="Student Name"
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <input
                name="contact"
                className="form-control"
                placeholder="Contact"
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <select
                name="gender"
                className="form-control"
                onChange={handleChange}
                required
              >
                <option value="">Select Gender</option>
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>

            <div className="col-md-6 mb-3">
              <input
                type="email"
                name="mail"
                className="form-control"
                placeholder="Email"
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <input
                type="date"
                name="dob"
                className="form-control"
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <input
                name="qualification"
                className="form-control"
                placeholder="Qualification"
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-12 mb-3">
              <textarea
                name="address"
                className="form-control"
                placeholder="Address"
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Password"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button className="btn btn-primary w-100">Register</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
