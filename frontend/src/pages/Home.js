// src/pages/Home.js
import React, { useEffect, useState } from "react";
import api from "../api";
import { Link } from "react-router-dom";
import "./Pages.css";

export default function Home() {
  const [top, setTop] = useState([]);
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    api.get("analytics/top-rated/")
      .then(res => setTop(res.data))
      .catch(() => setTop([]));

    api.get("analytics/trending/")
      .then(res => setTrending(res.data))
      .catch(() => setTrending([]));
  }, []);

  return (
    <div className="page">
      <h1 className="page-title">Dashboard</h1>

      <section className="card-grid">
        <div className="card">
          <h2>Top Rated</h2>
          {top.length === 0 ? <p className="muted">No data</p> : (
            <ul>
              {top.map(i => <li key={i.id}>{i.name} — ⭐ {i.avg_rating}</li>)}
            </ul>
          )}
        </div>

        <div className="card">
          <h2>Trending</h2>
          {trending.length === 0 ? <p className="muted">No data</p> : (
            <ul>
              {trending.map(i => <li key={i.id}>{i.name}</li>)}
            </ul>
          )}
        </div>
      </section>

      <section className="card">
        <h2>Quick Links</h2>
        <div className="links">
          <Link to="/categories" className="link-btn">Browse Categories</Link>
          <Link to="/items" className="link-btn">Browse All Items</Link>
        </div>
      </section>
    </div>
  );
}
