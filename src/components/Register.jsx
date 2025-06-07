import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    setError("");
    setSuccess("");
    try {
      const res = await fetch(`${API_BASE}/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, pass }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess("Registered successfully. You can login now.");
        setTimeout(() => navigate("/"), 2000);
      } else {
        setError(data.message || "Registration failed");
      }
    } catch {
      setError("Registration error");
    }
  };

  return (
    <div className="container" style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
      <h2>Register</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ width: "100%", marginBottom: 10 }}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: "100%", marginBottom: 10 }}
      />
      <input
        type="password"
        placeholder="Password"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
        style={{ width: "100%", marginBottom: 10 }}
      />
      <button onClick={handleRegister} style={{ width: "100%" }}>
        Register
      </button>
      <p>
        Already have an account?{" "}
        <a href="/" style={{ color: "blue" }}>
          Login
        </a>
      </p>
    </div>
  );
}
