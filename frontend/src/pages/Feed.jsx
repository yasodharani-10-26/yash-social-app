import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";

function Feed() {
  const [posts, setPosts] = useState([]);
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [comments, setComments] = useState({});

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "null");

  // AUTH CHECK
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  // FETCH POSTS
  const fetchPosts = async () => {
    try {
      const res = await api.get("/posts");
      setPosts(res.data);
    } catch (err) {
      console.log("Fetch posts error:", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // CREATE POST
  const createPost = async () => {
    if (!text && !image) return alert("Write something");

    try {
      await api.post("/posts", {
        userId: user._id,
        username: user.username,
        text,
        image,
      });

      setText("");
      setImage("");
      fetchPosts();
    } catch (err) {
      console.log(err);
    }
  };

  // LIKE POST
  const likePost = async (id) => {
    try {
      await api.put(`/posts/${id}/like`, {
        username: user.username,
      });

      fetchPosts();
    } catch (err) {
      console.log(err);
    }
  };

  // COMMENT
  const addComment = async (postId) => {
    const comment = comments[postId];

    if (!comment?.trim()) return;

    try {
      await api.put(`/posts/${postId}/comment`, {
        username: user.username,
        comment,
      });

      setComments({ ...comments, [postId]: "" });
      fetchPosts();
    } catch (err) {
      console.log(err);
    }
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div style={styles.page}>

      {/* NAVBAR */}
      <Navbar />

      {/* HEADER */}
      <div style={styles.header}>
        <h2>🌈 Social Feed</h2>
        <button onClick={logout} style={styles.logoutBtn}>
          Logout
        </button>
      </div>

      {/* CREATE POST */}
      <div style={styles.createBox}>
        <textarea
          placeholder="What's on your mind?"
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={styles.textarea}
        />

        <input
          placeholder="Image URL (optional)"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          style={styles.input}
        />

        <button onClick={createPost} style={styles.postBtn}>
          Post 🚀
        </button>
      </div>

      {/* POSTS */}
      {posts.map((post) => (
        <div key={post._id} style={styles.card}>

          {/* USER */}
          <div style={styles.userRow}>
            <div style={styles.avatar}>
              {post.username?.charAt(0).toUpperCase()}
            </div>
            <h3>{post.username}</h3>
          </div>

          {/* TEXT */}
          {post.text && <p style={styles.text}>{post.text}</p>}

          {/* IMAGE */}
          {post.image && (
            <img src={post.image} alt="post" style={styles.image} />
          )}

          {/* ACTIONS */}
          <div style={styles.actions}>
            <button onClick={() => likePost(post._id)} style={styles.likeBtn}>
              ❤️ {post.likes?.length || 0}
            </button>

            <span>💬 {post.comments?.length || 0}</span>
          </div>

          {/* COMMENT INPUT */}
          <div style={styles.commentBox}>
            <input
              placeholder="Write a comment..."
              value={comments[post._id] || ""}
              onChange={(e) =>
                setComments({
                  ...comments,
                  [post._id]: e.target.value,
                })
              }
              style={styles.commentInput}
            />

            <button
              onClick={() => addComment(post._id)}
              style={styles.commentBtn}
            >
              Send
            </button>
          </div>

          {/* COMMENTS */}
          <div style={styles.commentList}>
            {post.comments?.map((c, i) => (
              <div key={i} style={styles.comment}>
                <b style={{ color: "#4f46e5" }}>{c.username}</b>: {c.comment}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* 🎨 STYLES */
const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg,#74ebd5,#ACB6E5)",
    padding: "20px",
    fontFamily: "Arial",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#fff",
    padding: "12px 15px",
    borderRadius: "12px",
    marginBottom: "15px",
  },

  logoutBtn: {
    background: "#ef4444",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "8px",
    cursor: "pointer",
  },

  createBox: {
    background: "#fff",
    padding: "15px",
    borderRadius: "12px",
    marginBottom: "20px",
  },

  textarea: {
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
  },

  input: {
    width: "100%",
    marginTop: "10px",
    padding: "10px",
    borderRadius: "8px",
  },

  postBtn: {
    marginTop: "10px",
    padding: "10px 15px",
    background: "linear-gradient(135deg,#4f46e5,#7c3aed)",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
  },

  card: {
    background: "#fff",
    padding: "15px",
    borderRadius: "16px",
    marginBottom: "15px",
    boxShadow: "0 5px 20px rgba(0,0,0,0.08)",
  },

  userRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  avatar: {
    width: "38px",
    height: "38px",
    borderRadius: "50%",
    background: "#4f46e5",
    color: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
  },

  text: {
    marginTop: "10px",
  },

  image: {
    width: "100%",
    borderRadius: "12px",
    marginTop: "10px",
  },

  actions: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px",
  },

  likeBtn: {
    background: "#ffe4e6",
    border: "none",
    padding: "8px 12px",
    borderRadius: "10px",
    cursor: "pointer",
  },

  commentBox: {
    display: "flex",
    gap: "8px",
    marginTop: "10px",
  },

  commentInput: {
    flex: 1,
    padding: "8px",
    borderRadius: "8px",
  },

  commentBtn: {
    background: "#10b981",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "8px",
    cursor: "pointer",
  },

  commentList: {
    marginTop: "10px",
  },

  comment: {
    background: "#f3f4f6",
    padding: "6px",
    borderRadius: "8px",
    marginTop: "5px",
    fontSize: "13px",
  },
};

export default Feed;