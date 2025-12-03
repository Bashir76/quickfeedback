import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";

function ItemDetail() {
  const { id } = useParams();
  const [item, setItem] = useState({});
  const [feedback, setFeedback] = useState([]);
  const [newFeedback, setNewFeedback] = useState("");

  useEffect(() => {
    API.get(`/items/${id}/`).then((res) => setItem(res.data));
    API.get(`/items/${id}/feedback/`).then((res) => setFeedback(res.data));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    API.post(`/items/${id}/feedback/`, { content: newFeedback }).then((res) => {
      setFeedback([...feedback, res.data]);
      setNewFeedback("");
    });
  };

  return (
    <div>
      <h1>{item.name}</h1>
      <p>{item.description}</p>
      <h2>Feedback</h2>
      <ul>
        {feedback.map((f) => (
          <li key={f.id}>{f.content}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newFeedback}
          onChange={(e) => setNewFeedback(e.target.value)}
          placeholder="Write feedback..."
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ItemDetail;
