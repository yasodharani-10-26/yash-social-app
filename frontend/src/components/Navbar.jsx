import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  return (
    <div style={styles.nav}>
      <h2 style={styles.logo}>🌈 SocialApp</h2>

      <div style={styles.links}>
        <button onClick={() => navigate("/feed")}>🏠 Feed</button>
        <button onClick={() => navigate("/profile")}>👤 Profile</button>
      </div>

      <div style={styles.user}>
        {user?.username}
      </div>
    </div>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 20px",
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
    marginBottom: "15px",
  },
  logo: { color: "#4f46e5" },
  links: { display: "flex", gap: "10px" },
  user: { fontWeight: "bold" }
};

export default Navbar;