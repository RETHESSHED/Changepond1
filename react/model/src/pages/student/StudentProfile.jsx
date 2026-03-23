import { useState } from "react";
import api from "../../api";

function StudentProfile() {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [form, setForm] = useState(storedUser);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    await api.put(`/users/${form.id}`, form);
    localStorage.setItem("user", JSON.stringify(form));
    alert("Profile Updated");
  };

  return (
    <div className="container mt-4">
      <div className="card shadow p-4">
        <h3 className="mb-4">Edit Profile</h3>

        <form onSubmit={handleUpdate} className="row g-3">
          <div className="col-md-6">
            <input
              name="studentname"
              value={form.studentname}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="col-md-6">
            <input
              name="contact"
              value={form.contact}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="col-md-6">
            <input
              name="mail"
              value={form.mail}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="col-md-6">
            <input
              name="qualification"
              value={form.qualification}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="col-12">
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="col-md-6">
            <button className="btn btn-primary w-100">Update Profile</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StudentProfile;
