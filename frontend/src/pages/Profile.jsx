import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";

function Profile() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (!user) navigate("/login");
  }, []);

  const fetchPosts = async () => {
    const res = await api.get("/posts");
    const myPosts = res.data.filter(
      (p) => p.username === user.username
    );
    setPosts(myPosts);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div style={styles.page}>
      <Navbar />

      {/* PROFILE HEADER */}
      <div style={styles.card}>
        <div style={styles.avatar}>
          {user?.username?.charAt(0).toUpperCase()}
        </div>

        <h2>{user?.username}</h2>
        <p>{user?.email}</p>

        <div style={styles.stats}>
          <div>
            <h3>{posts.length}</h3>
            <p>Posts</p>
          </div>
          <div>
            <h3>❤️</h3>
            <p>Likes</p>
          </div>
          <div>
            <h3>💬</h3>
            <p>Comments</p>
          </div>
        </div>
      </div>

      {/* POSTS */}
      <h3 style={{ marginTop: "20px" }}>Your Posts</h3>

      {posts.map((post) => (
        <div key={post._id} style={styles.postCard}>
          <p>{post.text}</p>

          {post.image && (
            <img src={post.image} style={styles.image} />
          )}

          <div style={styles.meta}>
            ❤️ {post.likes?.length || 0} | 💬{" "}
            {post.comments?.length || 0}
          </div>
        </div>
      ))}
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg,#74ebd5,#ACB6E5)",
    padding: "20px",
  },

  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "15px",
    textAlign: "center",
    boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
  },

  avatar: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    background: "#4f46e5",
    color: "#fff",
    fontSize: "30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
  },

  stats: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "15px",
  },

  postCard: {
    background: "#fff",
    padding: "15px",
    borderRadius: "12px",
    marginTop: "15px",
  },

  image: {
    width: "100%",
    borderRadius: "10px",
    marginTop: "10px",
  },

  meta: {
    marginTop: "8px",
    fontSize: "13px",
    color: "#555",
  },
};

export default Profile;