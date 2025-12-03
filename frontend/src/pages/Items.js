// src/pages/Items.js
import React, { useEffect, useState } from "react";
import api from "../api";
import { Link, useLocation } from "react-router-dom";
import "./Pages.css";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Items() {
  const [items, setItems] = useState([]);
  const query = useQuery();
  const category = query.get("category");

  useEffect(() => {
    const url = category ? `items/?category=${category}` : "items/";
    api.get(url)
      .then(res => setItems(res.data))
      .catch(err => { console.error(err); setItems([]); });
  }, [category]);

  return (
    <div className="page">
      <h1 className="page-title">Items {category ? `(Category ${category})` : ""}</h1>
      <div className="grid">
        {items.length === 0 ? <p className="muted">No items</p> : items.map(it => (
          <div key={it.id} className="card">
            <h3>{it.name}</h3>
            <p className="muted">{it.description}</p>
            <div className="card-actions">
              <Link to={`/item/${it.id}`} className="link-btn">Detail</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
