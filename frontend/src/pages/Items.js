import { useEffect, useState } from "react";
import API from "../api/api";
import ItemCard from "../components/ItemCard";

function Items() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    API.get("/items/")
      .then((res) => setItems(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>Items</h1>
      <div className="items-grid">
        {items.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default Items;
