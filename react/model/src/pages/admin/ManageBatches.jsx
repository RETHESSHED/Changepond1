import { useEffect, useState } from "react";
import api from "../../api";

function ManageBatches() {
  const [batches, setBatches] = useState([]);
  const [form, setForm] = useState({});

  const fetchBatches = async () => {
    const res = await api.get("/batches");
    setBatches(res.data);
  };

  useEffect(() => {
    fetchBatches();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/batches", form);
    setForm({});
    fetchBatches();
  };

  const handleDelete = async (id) => {
    await api.delete(`/batches/${id}`);
    fetchBatches();
  };

  return (
    <div className="container mt-4">
      <h3>Manage Batches</h3>

      <div className="card p-3 mb-4">
        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-md-6">
            <input
              name="name"
              value={form.name || ""}
              onChange={handleChange}
              className="form-control"
              placeholder="Batch Name"
              required
            />
          </div>

          <div className="col-md-6">
            <input
              name="trainerId"
              value={form.trainerId || ""}
              onChange={handleChange}
              className="form-control"
              placeholder="Trainer ID"
              required
            />
          </div>

          <div className="col-md-4">
            <button className="btn btn-primary w-100">Add Batch</button>
          </div>
        </form>
      </div>

      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Trainer ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {batches.map((b) => (
            <tr key={b.id}>
              <td>{b.name}</td>
              <td>{b.trainerId}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(b.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageBatches;
