import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("user", JSON.stringify(res.data));

      toast.success("Login Successful 🚀");
      navigate("/feed");
    } catch (err) {
      toast.error("Login Failed ❌");
    }
  };

  return (
    <div style={styles.bg}>
      <div style={styles.card}>
        <h1>Welcome Back 👋</h1>
        <p>Login to continue</p>

        <input
          placeholder="Email"
          style={styles.input}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div style={styles.passBox}>
          <input
            placeholder="Password"
            type={show ? "text" : "password"}
            style={styles.input}
            onChange={(e) => setPassword(e.target.value)}
          />

          <span onClick={() => setShow(!show)} style={styles.eye}>
            {show ? "🙈" : "👁️"}
          </span>
        </div>

        <button style={styles.btn} onClick={handleLogin}>
          Login
        </button>

        <p style={styles.link} onClick={() => navigate("/")}>
          New user? Signup
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
    fontFamily: "Arial",
  },

  card: {
    width: "350px",
    background: "#fff",
    padding: "30px",
    borderRadius: "18px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
    textAlign: "center",
    animation: "fadeIn 0.5s ease-in",
  },

  input: {
    width: "100%",
    padding: "12px",
    marginTop: "10px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    outline: "none",
  },

  btn: {
    width: "100%",
    padding: "12px",
    marginTop: "15px",
    background: "#6366f1",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  link: {
    marginTop: "10px",
    fontSize: "13px",
    color: "#6366f1",
    cursor: "pointer",
  },

  passBox: {
    position: "relative",
  },

  eye: {
    position: "absolute",
    right: "10px",
    top: "18px",
    cursor: "pointer",
  },
};

export default Login;