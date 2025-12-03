import { useEffect, useState } from "react";
import API from "../api/api";
import CategoryCard from "../components/CategoryCard";

function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    API.get("/categories/")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>Categories</h1>
      <div className="categories-grid">
        {categories.map((cat) => (
          <CategoryCard key={cat.id} category={cat} />
        ))}
      </div>
    </div>
  );
}

export default Categories;
