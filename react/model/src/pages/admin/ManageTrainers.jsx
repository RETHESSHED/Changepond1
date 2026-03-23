import { useEffect, useState } from "react";
import api from "../../api";
import * as XLSX from "xlsx";

function ManageTrainers() {
  const [trainers, setTrainers] = useState([]);
  const [form, setForm] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewingTrainer, setViewingTrainer] = useState(null); // State for View Modal

  const fetchTrainers = async () => {
    try {
      const res = await api.get("/users?role=trainer");
      setTrainers(res.data || []);
    } catch (error) {
      console.error("Error fetching trainers:", error);
    }
  };

  useEffect(() => {
    fetchTrainers();
  }, []);

  // Filter Logic
  const filteredTrainers = trainers.filter((t) => {
    const term = searchTerm.toLowerCase();
    const name = (t.name || "").toLowerCase();
    const email = (t.mail || "").toLowerCase();
    return name.includes(term) || email.includes(term);
  });

  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(trainers);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Trainers");
    XLSX.writeFile(workbook, "Trainers_Data.xlsx");
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
      for (const trainer of json) {
        await api.post("/users", { ...trainer, role: "trainer" });
      }
      fetchTrainers();
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
      await api.put(`/users/${editingId}`, { ...form, role: "trainer" });
    } else {
      await api.post("/users", { ...form, role: "trainer" });
    }
    setForm({});
    setEditingId(null);
    fetchTrainers();
  };

  const handleEdit = (trainer) => {
    setForm(trainer);
    setEditingId(trainer.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      await api.delete(`/users/${id}`);
      fetchTrainers();
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-between mb-4 align-items-center">
        <div className="col-md-3">
          <h3 className="fw-bold">Trainers</h3>
        </div>

        {/* Search Bar */}
        <div className="col-md-6">
          <div className="input-group shadow-sm rounded-pill overflow-hidden border">
            <span className="input-group-text bg-white border-0 ps-3">🔍</span>
            <input
              type="text"
              className="form-control border-0 shadow-none"
              placeholder="Search name or email..."
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
      <div className="card p-3 mb-4 shadow-sm border-0 bg-light rounded-4">
        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-md-3">
            <input name="name" value={form.name || ""} onChange={handleChange} className="form-control border-0 shadow-sm" placeholder="Trainer Name" required />
          </div>
          <div className="col-md-3">
            <input name="mail" type="email" value={form.mail || ""} onChange={handleChange} className="form-control border-0 shadow-sm" placeholder="Email" required />
          </div>
          <div className="col-md-3">
            <input name="password" type="password" value={form.password || ""} onChange={handleChange} className="form-control border-0 shadow-sm" placeholder="Password" required={!editingId} />
          </div>
          <div className="col-md-3">
            <button className={`btn w-100 rounded-3 ${editingId ? "btn-warning" : "btn-primary"}`}>
              {editingId ? "Update Trainer" : "Add Trainer"}
            </button>
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
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTrainers.length > 0 ? (
              filteredTrainers.map((t) => (
                <tr key={t.id}>
                  <td className="ps-4 fw-bold text-primary">{t.name}</td>
                  <td>{t.mail}</td>
                  <td className="text-center">
                    <button className="btn btn-sm btn-outline-info me-2" onClick={() => setViewingTrainer(t)}>View</button>
                    <button className="btn btn-sm btn-outline-warning me-2" onClick={() => handleEdit(t)}>Edit</button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(t.id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-4 text-muted">No trainers found matching your search.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* VIEW MODAL */}
      {viewingTrainer && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg rounded-4">
              <div className="modal-header border-0 bg-primary text-white rounded-top-4">
                <h5 className="modal-title fw-bold">Trainer Profile</h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setViewingTrainer(null)}></button>
              </div>
              <div className="modal-body p-4">
                <div className="row g-3">
                  <div className="col-6">
                    <label className="text-muted small d-block">Full Name</label>
                    <span className="fw-bold">{viewingTrainer.name}</span>
                  </div>
                  <div className="col-6">
                    <label className="text-muted small d-block">Role</label>
                    <span className="badge bg-success-subtle text-success text-capitalize">{viewingTrainer.role}</span>
                  </div>
                  <div className="col-12">
                    <label className="text-muted small d-block">Email Address</label>
                    <span className="fw-bold">{viewingTrainer.mail}</span>
                  </div>
                  {/* These fields will show if they exist in your db.json */}
                  <div className="col-6">
                    <label className="text-muted small d-block">Contact</label>
                    <span className="fw-bold">{viewingTrainer.contact || "N/A"}</span>
                  </div>
                  <div className="col-6">
                    <label className="text-muted small d-block">Expertise</label>
                    <span className="fw-bold">{viewingTrainer.expertise || "N/A"}</span>
                  </div>
                </div>
              </div>
              <div className="modal-footer border-0">
                <button type="button" className="btn btn-secondary rounded-pill px-4" onClick={() => setViewingTrainer(null)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageTrainers;
