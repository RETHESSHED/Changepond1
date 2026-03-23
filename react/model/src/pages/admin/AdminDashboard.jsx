import { useEffect, useState } from "react";
import api from "../../api";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell
} from "recharts";
// Icons often come from 'react-icons' - install via: npm install react-icons
import { FiUsers, FiUserCheck, FiBookOpen, FiLayers } from "react-icons/fi";

function AdminDashboard() {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [users, courses, batches] = await Promise.all([
          api.get("/users"),
          api.get("/courses"),
          api.get("/batches")
        ]);

        const students = users.data.filter((u) => u.role === "student").length;
        const trainers = users.data.filter((u) => u.role === "trainer").length;

        setStats([
          { name: "Students", count: students, icon: <FiUsers />, color: "#4e73df" },
          { name: "Trainers", count: trainers, icon: <FiUserCheck />, color: "#1cc88a" },
          { name: "Courses", count: courses.data.length, icon: <FiBookOpen />, color: "#36b9cc" },
          { name: "Batches", count: batches.data.length, icon: <FiLayers />, color: "#f6c23e" },
        ]);
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="text-center mt-5">Loading Dashboard...</div>;

  return (
    <div className="container-fluid py-4" style={{ backgroundColor: "#f8f9fc", minHeight: "100vh" }}>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800 fw-bold">Dashboard Overview</h1>
        <button className="btn btn-sm btn-primary shadow-sm">Generate Report</button>
      </div>

      {/* Stats Cards */}
      <div className="row">
        {stats.map((item, index) => (
          <div key={index} className="col-xl-3 col-md-6 mb-4">
            <div className="card border-0 shadow-sm h-100 py-2" style={{ borderLeft: `4px solid ${item.color}` }}>
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-uppercase mb-1" style={{ color: item.color, fontSize: '0.8rem', letterSpacing: '1px' }}>
                      {item.name}
                    </div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">{item.count}</div>
                  </div>
                  <div className="col-auto">
                    <span style={{ fontSize: '2rem', color: '#dddfeb' }}>{item.icon}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Chart Section */}
      <div className="row">
        <div className="col-xl-8 col-lg-7">
          <div className="card shadow-sm mb-4 border-0">
            <div className="card-header py-3 bg-white border-0">
              <h6 className="m-0 font-weight-bold text-primary">System Growth Analytics</h6>
            </div>
            <div className="card-body">
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={stats} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6e707e', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6e707e', fontSize: 12 }} />
                  <Tooltip 
                    cursor={{ fill: '#f8f9fc' }}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Bar dataKey="count" radius={[10, 10, 0, 0]} barSize={50}>
                    {stats.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Example Side Card */}
        <div className="col-xl-4 col-lg-5">
          <div className="card shadow-sm mb-4 border-0">
            <div className="card-header py-3 bg-white border-0">
              <h6 className="m-0 font-weight-bold text-primary">Recent Activity</h6>
            </div>
            <div className="card-body">
              <div className="small text-muted">No recent logs found.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
