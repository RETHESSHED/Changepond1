import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import api from "../../api";

function ManageStudents() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewingStudent, setViewingStudent] = useState(null); // State for View Modal

  const fetchStudents = async () => {
    try {
      const res = await api.get("/users?role=student");
      setStudents(res.data || []);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const filteredStudents = students.filter((s) => {
    const term = searchTerm.toLowerCase();
    const name = (s.studentname || "").toLowerCase();
    const email = (s.mail || "").toLowerCase();
    const qual = (s.qualification || "").toLowerCase();
    return name.includes(term) || email.includes(term) || qual.includes(term);
  });

  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(students);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");
    XLSX.writeFile(workbook, "Students_Data.xlsx");
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
      for (const student of json) {
        await api.post("/users", { ...student, role: "student" });
      }
      fetchStudents();
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
      await api.put(`/users/${editingId}`, { ...form, role: "student" });
    } else {
      await api.post("/users", { ...form, role: "student" });
    }
    setForm({});
    setEditingId(null);
    fetchStudents();
  };

  const handleEdit = (student) => {
    setForm(student);
    setEditingId(student.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      await api.delete(`/users/${id}`);
      fetchStudents();
    }
  };

  const user = JSON.parse(localStorage.getItem("user")) || {};

  return (
    <div className="container mt-4">
      {/* Header Section */}
      <div className="row align-items-center mb-4">
        <div className="col-md-3">
          <h3 className="fw-bold">Students</h3>
        </div>
        <div className="col-md-6">
          <div className="input-group shadow-sm rounded-pill overflow-hidden border">
            <span className="input-group-text bg-white border-0 ps-3">🔍</span>
            <input
              type="text"
              className="form-control border-0 shadow-none"
              placeholder="Search name, email, or qualification..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button className="btn btn-link text-muted border-0 me-2" onClick={() => setSearchTerm("")}>✕</button>
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

      {/* Add/Edit Form */}
      <div className="card border-0 shadow-sm p-4 mb-4 bg-light rounded-4">
        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-md-2"><input name="studentname" value={form.studentname || ""} onChange={handleChange} className="form-control border-0 shadow-sm" placeholder="Name" required /></div>
          <div className="col-md-3"><input name="mail" value={form.mail || ""} onChange={handleChange} className="form-control border-0 shadow-sm" placeholder="Email" required /></div>
          <div className="col-md-2"><input name="password" value={form.password || ""} onChange={handleChange} className="form-control border-0 shadow-sm" placeholder="Password" required /></div>
          <div className="col-md-2"><input name="contact" value={form.contact || ""} onChange={handleChange} className="form-control border-0 shadow-sm" placeholder="Contact" required /></div>
          <div className="col-md-3 d-flex gap-2">
            <input name="qualification" value={form.qualification || ""} onChange={handleChange} className="form-control border-0 shadow-sm" placeholder="Qual." />
            <button className={`btn w-100 rounded-3 ${editingId ? 'btn-warning' : 'btn-primary'}`}>{editingId ? "Update" : "Add"}</button>
          </div>
        </form>
      </div>

      {/* Table Section */}
      <div className="table-responsive shadow-sm rounded-4 border bg-white">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th className="ps-4">Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Qualification</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((s, index) => (
                <tr key={`${s.id}-${index}`}>
                  <td className="ps-4 fw-bold text-primary">{s.studentname}</td>
                  <td>{s.mail}</td>
                  <td>{s.contact}</td>
                  <td><span className="badge bg-info-subtle text-info rounded-pill px-3">{s.qualification || "N/A"}</span></td>
                  <td className="text-center">
                    <button className="btn btn-sm btn-outline-info me-2" onClick={() => setViewingStudent(s)}>View</button>
                    <button className="btn btn-sm btn-outline-warning me-2" onClick={() => handleEdit(s)}>Edit</button>
                    {user.role === "admin" && (
                      <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(s.id)}>Delete</button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="5" className="text-center py-5 text-muted">No matches found</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* VIEW MODAL (Displays when viewingStudent is not null) */}
      {viewingStudent && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg rounded-4">
              <div className="modal-header border-0 bg-primary text-white rounded-top-4">
                <h5 className="modal-title fw-bold">Student Profile</h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setViewingStudent(null)}></button>
              </div>
              <div className="modal-body p-4">
                <div className="row g-3">
                  <div className="col-6"><label className="text-muted small">Name</label><p className="fw-bold">{viewingStudent.studentname}</p></div>
                  <div className="col-6"><label className="text-muted small">Email</label><p className="fw-bold">{viewingStudent.mail}</p></div>
                  <div className="col-6"><label className="text-muted small">Contact</label><p className="fw-bold">{viewingStudent.contact}</p></div>
                  <div className="col-6"><label className="text-muted small">Gender</label><p className="fw-bold">{viewingStudent.gender || "N/A"}</p></div>
                  <div className="col-6"><label className="text-muted small">DOB</label><p className="fw-bold">{viewingStudent.dob || "N/A"}</p></div>
                  <div className="col-6"><label className="text-muted small">Qualification</label><p className="fw-bold">{viewingStudent.qualification || "N/A"}</p></div>
                  <div className="col-12"><label className="text-muted small">Address</label><p className="fw-bold">{viewingStudent.address || "N/A"}</p></div>
                </div>
              </div>
              <div className="modal-footer border-0">
                <button type="button" className="btn btn-secondary rounded-pill px-4" onClick={() => setViewingStudent(null)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageStudents;
