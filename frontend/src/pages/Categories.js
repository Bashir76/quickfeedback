// src/pages/Categories.js
import React, { useEffect, useState } from "react";
import api from "../api";
import { Link } from "react-router-dom";
import "./Pages.css";

export default function Categories() {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    api.get("categories/")
      .then(res => setCats(res.data))
      .catch(err => { console.error(err); setCats([]); });
  }, []);

  return (
    <div className="page">
      <h1 className="page-title">Categories</h1>
      <div className="grid">
        {cats.length === 0 ? <p className="muted">No categories</p> : cats.map(c => (
          <div key={c.id} className="card">
            <h3>{c.name}</h3>
            <p className="muted">{c.description}</p>
            <Link to={`/items?category=${c.id}`} className="link-btn">View items</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
