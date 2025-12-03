import { Link } from "react-router-dom";

function ItemCard({ item }) {
  return (
    <div className="item-card">
      <h3>{item.name}</h3>
      <p>{item.description}</p>
      <Link to={`/items/${item.id}`}>View Details</Link>
    </div>
  );
}

export default ItemCard;
