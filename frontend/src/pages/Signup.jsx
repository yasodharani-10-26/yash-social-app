import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await api.post("/auth/signup", {
        username,
        email,
        password,
      });

      alert("Signup Successful 🎉");
      navigate("/login");
    } catch (err) {
      alert("Signup Failed ❌");
    }
  };

  return (
    <div style={styles.bg}>
      <div style={styles.card}>
        <h1>Create Account ✨</h1>

        <input
          placeholder="Username"
          style={styles.input}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          placeholder="Email"
          style={styles.input}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          style={styles.input}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={styles.btn} onClick={handleSignup}>
          Sign Up
        </button>

        <p style={styles.link} onClick={() => navigate("/login")}>
          Already have account? Login
        </p>
      </div>
    </div>
  );
}

const styles = {
  bg: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg,#667eea,#764ba2)",
  },

  card: {
    width: "360px",
    background: "#fff",
    padding: "30px",
    borderRadius: "18px",
    textAlign: "center",
  },

  input: {
    width: "100%",
    padding: "12px",
    margin: "8px 0",
    borderRadius: "10px",
    border: "1px solid #ddd",
  },

  btn: {
    width: "100%",
    padding: "12px",
    marginTop: "10px",
    background: "#4f46e5",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
  },

  link: {
    marginTop: "10px",
    color: "#4f46e5",
    cursor: "pointer",
  },
};

export default Signup;