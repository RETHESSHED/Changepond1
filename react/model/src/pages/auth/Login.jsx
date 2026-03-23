import React, { useEffect, useState } from "react";
import api from "../../api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("user");
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.get(
        `/users?mail=${mail}&password=${password}`
      );

      if (res.data.length > 0) {
        const user = res.data[0];

        localStorage.setItem("user", JSON.stringify(user));

        // 🔥 Go to Welcome Screen First
        navigate("/welcome");
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      alert("Login failed");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 col-md-4 mx-auto shadow">
        <h3 className="text-center mb-3">Login</h3>

        <form onSubmit={handleLogin}>
          <input
            className="form-control mb-3"
            placeholder="Email"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
            required
          />

          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="btn btn-danger w-100">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
