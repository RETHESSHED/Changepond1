import React, { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:8888";

const AchievementList = () => {
  const [achievements, setAchievements] = useState([]);
  const [students, setStudents] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState("");
  const [searchEmail, setSearchEmail] = useState("");

  const [formData, setFormData] = useState({
    studentname: "",
    mail: "",
    title: "",
    description: "",
    date: "",
  });

  const [editId, setEditId] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  const isAdmin = user?.role === "admin";
  const isTrainer = user?.role === "trainer";
  const isStudent = user?.role === "student";

  useEffect(() => {
    fetchAchievements();
    fetchStudents();
  }, []);

  const fetchAchievements = async () => {
    const res = await axios.get(`${BASE_URL}/achievements`);
    setAchievements(res.data);
  };

  const fetchStudents = async () => {
    const res = await axios.get(`${BASE_URL}/users`);
    const studentList = res.data.filter(
      (u) => u.role === "student"
    );
    setStudents(studentList);
  };

  // Suggestion logic
  const handleNameChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, studentname: value });

    if (value.length > 0) {
      const filtered = students.filter((s) =>
        s.studentname.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, mail: value });

    if (value.length > 0) {
      const filtered = students.filter((s) =>
        s.mail.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const selectSuggestion = (student) => {
    setFormData({
      ...formData,
      studentname: student.studentname,
      mail: student.mail,
    });
    setSuggestions([]);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const validStudent = students.find(
      (s) =>
        s.studentname === formData.studentname &&
        s.mail === formData.mail
    );

    if (!validStudent) {
      setError("❌ Enter correct student details");
      return;
    }

    const duplicate = achievements.find(
      (a) =>
        a.mail === formData.mail &&
        a.title === formData.title
    );

    if (duplicate && !editId) {
      setError("❌ Achievement already exists");
      return;
    }

    if (editId) {
      await axios.put(
        `${BASE_URL}/achievements/${editId}`,
        formData
      );
      setEditId(null);
    } else {
      await axios.post(
        `${BASE_URL}/achievements`,
        formData
      );
    }

    setFormData({
      studentname: "",
      mail: "",
      title: "",
      description: "",
      date: "",
    });

    fetchAchievements();
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditId(item.id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${BASE_URL}/achievements/${id}`);
    fetchAchievements();
  };

  // Role based filtering
  const filteredAchievements =
    isStudent
      ? achievements.filter((a) => a.mail === user.mail)
      : achievements.filter((a) =>
          a.mail.toLowerCase().includes(searchEmail.toLowerCase())
        );

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-4">Student Achievements</h3>

      {/* ================= ADMIN FORM ================= */}
      {isAdmin && (
        <form onSubmit={handleSubmit} className="card p-3 mb-4 shadow">
          <div className="position-relative mb-2">
            <input
              type="text"
              placeholder="Student Name"
              value={formData.studentname}
              onChange={handleNameChange}
              className="form-control"
              required
            />

            {suggestions.length > 0 && (
              <ul className="list-group position-absolute w-100">
                {suggestions.map((s) => (
                  <li
                    key={s.id}
                    className="list-group-item list-group-item-action"
                    onClick={() => selectSuggestion(s)}
                    style={{ cursor: "pointer" }}
                  >
                    {s.studentname} ({s.mail})
                  </li>
                ))}
              </ul>
            )}
          </div>

          <input
            type="email"
            placeholder="Student Email"
            value={formData.mail}
            onChange={handleEmailChange}
            className="form-control mb-2"
            required
          />

          <input
            type="text"
            name="title"
            placeholder="Achievement Title"
            value={formData.title}
            onChange={handleChange}
            className="form-control mb-2"
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="form-control mb-2"
            required
          />

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="form-control mb-2"
            required
          />

          {error && <div className="text-danger mb-2">{error}</div>}

          <button className="btn btn-success">
            {editId ? "Update Achievement" : "Add Achievement"}
          </button>
        </form>
      )}

      {/* Search for Admin & Trainer */}
      {(isAdmin || isTrainer) && (
        <input
          type="text"
          placeholder="Search by name..."
          className="form-control mb-3"
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
        />
      )}

      {/* ================= ADMIN VIEW ================= */}
      {isAdmin && (
        <table className="table table-dark table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Title</th>
              <th>Description</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAchievements.map((item) => (
              <tr key={item.id}>
                <td>{item.studentname}</td>
                <td>{item.mail}</td>
                <td>{item.title}</td>
                <td>{item.description}</td>
                <td>{item.date}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* ================= TRAINER VIEW ================= */}
      {isTrainer && (
        <div className="row">
          {filteredAchievements.map((item) => (
            <div className="col-md-4 mb-3" key={item.id}>
              <div className="card shadow">
                <div className="card-body">
                  <h5 className="card-title">{item.studentname}</h5>
                  <h6 className="text-primary">{item.title}</h6>
                  <p>{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ================= STUDENT VIEW ================= */}
      {isStudent && (
        <div className="row">
          {filteredAchievements.map((item) => (
            <div className="col-md-4 mb-3" key={item.id}>
              <div className="card border-success shadow">
                <div className="card-body">
                  <h5 className="card-title">{item.studentname}</h5>
                  <h6 className="text-success">{item.title}</h6>
                  <p>{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AchievementList;
