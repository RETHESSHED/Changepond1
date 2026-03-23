import { useEffect, useState } from "react";
import api from "../../api";
import * as XLSX from "xlsx";

function ManageCourses() {
  const [courses, setCourses] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [form, setForm] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewingCourse, setViewingCourse] = useState(null); // State for View Modal

  const fetchData = async () => {
    try {
      const courseRes = await api.get("/courses");
      const trainerRes = await api.get("/users?role=trainer");
      setCourses(courseRes.data || []);
      setTrainers(trainerRes.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // --- SEARCH / FILTER LOGIC ---
  const filteredCourses = courses.filter((c) => {
    const term = searchTerm.toLowerCase();
    const title = (c.title || "").toLowerCase();
    const trainer = trainers.find((t) => String(t.id) === String(c.trainerId));
    const trainerName = trainer ? trainer.name.toLowerCase() : "";

    return title.includes(term) || trainerName.includes(term);
  });

  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(courses);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Courses");
    XLSX.writeFile(workbook, "Courses_Data.xlsx");
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const json = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
      for (const course of json) {
        await api.post("/courses", course);
      }
      fetchData();
      e.target.value = null;
    };
    reader.readAsArrayBuffer(file);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await api.put(`/courses/${editingId}`, form);
    } else {
      await api.post("/courses", form);
    }
    setForm({});
    setEditingId(null);
    fetchData();
  };

  const handleEdit = (course) => {
    setForm(course);
    setEditingId(course.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      await api.delete(`/courses/${id}`);
      fetchData();
    }
  };

  const user = JSON.parse(localStorage.getItem("user")) || {};

  return (
    <div className="container mt-4">
      {/* Header Section */}
      <div className="row justify-content-between mb-4 align-items-center">
        <div className="col-md-3">
          <h3 className="fw-bold">Manage Courses</h3>
        </div>

        <div className="col-md-6">
          <div className="input-group shadow-sm rounded-pill overflow-hidden border">
            <span className="input-group-text bg-white border-0 ps-3">🔍</span>
            <input
              type="text"
              className="form-control border-0 shadow-none"
              placeholder="Search course title or trainer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button 
                className="btn btn-link text-muted border-0 me-2" 
                onClick={() => setSearchTerm("")}
                style={{ textDecoration: 'none' }}
              >✕</button>
            )}
          </div>
        </div>

        <div className="col-md-3 text-end">
          <button className="btn btn-outline-secondary rounded-pill px-4 me-2 shadow-sm" onClick={handleExport}>Export</button>
          <label className="btn btn-outline-info rounded-pill px-4 mb-0 shadow-sm" style={{ cursor: 'pointer' }}>
            Import
            <input type="file" hidden accept=".xlsx, .xls, .csv" onChange={handleImport} />
          </label>
        </div>
      </div>

      {/* Form Section */}
      <div className="card p-4 border-0 shadow-sm mb-4 bg-light rounded-4">
        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-md-5">
            <input
              name="title"
              value={form.title || ""}
              onChange={handleChange}
              className="form-control border-0 shadow-sm"
              placeholder="Course Title"
              required
            />
          </div>
          <div className="col-md-4">
            <select
              name="trainerId"
              value={form.trainerId || ""}
              onChange={handleChange}
              className="form-select border-0 shadow-sm"
              required
            >
              <option value="">Select Trainer</option>
              {trainers.map((t) => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
          </div>
          <div className="col-md-3">
            <button className={`btn w-100 rounded-3 ${editingId ? "btn-warning" : "btn-primary"}`}>
              {editingId ? "Update Course" : "Add Course"}
            </button>
          </div>
        </form>
      </div>

      {/* Table Section */}
      <div className="table-responsive shadow-sm rounded-4 border bg-white">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th className="ps-4">Course Title</th>
              <th>Assigned Trainer</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCourses.length > 0 ? (
              filteredCourses.map((c) => {
                const trainer = trainers.find((t) => String(t.id) === String(c.trainerId));
                return (
                  <tr key={c.id}>
                    <td className="ps-4 fw-bold text-primary">{c.title}</td>
                    <td>
                        <span className="badge bg-secondary-subtle text-secondary rounded-pill px-3">
                            {trainer ? trainer.name : "Unassigned"}
                        </span>
                    </td>
                    <td className="text-center">
                      <button className="btn btn-sm btn-outline-info me-2" onClick={() => setViewingCourse(c)}>View</button>
                      <button className="btn btn-sm btn-outline-warning me-2" onClick={() => handleEdit(c)}>Edit</button>
                      {user.role === "admin" && (
                        <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(c.id)}>Delete</button>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-5 text-muted">No courses found matching your search.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* VIEW MODAL */}
      {viewingCourse && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg rounded-4">
              <div className="modal-header border-0 bg-primary text-white rounded-top-4">
                <h5 className="modal-title fw-bold">Course Details</h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setViewingCourse(null)}></button>
              </div>
              <div className="modal-body p-4">
                <div className="row g-3">
                  <div className="col-12">
                    <label className="text-muted small d-block">Course Title</label>
                    <p className="fw-bold fs-5 mb-0">{viewingCourse.title}</p>
                  </div>
                  <hr />
                  <div className="col-6">
                    <label className="text-muted small d-block">Trainer Name</label>
                    <p className="fw-bold">
                        {trainers.find(t => String(t.id) === String(viewingCourse.trainerId))?.name || "N/A"}
                    </p>
                  </div>
                  <div className="col-6">
                    <label className="text-muted small d-block">Trainer Email</label>
                    <p className="fw-bold">
                        {trainers.find(t => String(t.id) === String(viewingCourse.trainerId))?.mail || "N/A"}
                    </p>
                  </div>
                  <div className="col-12">
                     <label className="text-muted small d-block">Course ID Reference</label>
                     <code className="text-secondary">{viewingCourse.id}</code>
                  </div>
                </div>
              </div>
              <div className="modal-footer border-0">
                <button type="button" className="btn btn-secondary rounded-pill px-4" onClick={() => setViewingCourse(null)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageCourses;
