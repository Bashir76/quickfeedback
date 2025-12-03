// src/pages/ItemDetails.js
import React, { useEffect, useState, useContext } from "react";
import api from "../api";
import { useParams, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Pages.css";

export default function ItemDetails() {
  const { itemId } = useParams();
  const [item, setItem] = useState(null);
  const [feedback, setFeedback] = useState([]);
  const [comment, setComment] = useState("");
  const { user } = useContext(AuthContext);

  useEffect(() => {
    api.get(`items/${itemId}/`)
      .then(res => setItem(res.data))
      .catch(err => console.error(err));

    api.get(`items/${itemId}/feedback/`)
      .then(res => setFeedback(res.data))
      .catch(err => console.error(err));
  }, [itemId]);

  const submit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Login required to submit feedback.");
      return;
    }
    try {
      const res = await api.post(`items/${itemId}/feedback/`, { comment });
      setFeedback([...feedback, res.data]);
      setComment("");
    } catch (err) {
      console.error(err);
      alert("Failed to submit feedback.");
    }
  };

  if (!item) return <div className="page"><p className="muted">Loading...</p></div>;

  return (
    <div className="page">
      <h1 className="page-title">{item.name}</h1>
      <div className="card">
        <p>{item.description}</p>
      </div>

      <h2>Feedback</h2>
      <div className="grid">
        {feedback.length === 0 ? <p className="muted">No feedback yet.</p> : feedback.map(f => (
          <div className="card" key={f.id}>
            <p>{f.comment}</p>
            <p className="muted">By: {f.user?.username || "anonymous"}</p>
          </div>
        ))}
      </div>

      <div className="card">
        <h3>Leave feedback</h3>
        {user ? (
          <form onSubmit={submit}>
            <textarea value={comment} onChange={(e) => setComment(e.target.value)} required placeholder="Your feedback..." />
            <button className="primary" type="submit">Submit</button>
          </form>
        ) : (
          <p className="muted">Please <Link to="/login">login</Link> to submit feedback.</p>
        )}
      </div>

      <Link className="back-btn" to={item.category ? `/items?category=${item.category}` : "/items"}>← Back</Link>
    </div>
  );
}
