import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";

export default function Search() {
  const { key } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    API.get(`/products/search/${key}`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, [key]);

  return (
    <div className="products">
      <h2>Search Results</h2>

      {products.map((p) => (
        <div key={p._id} className="card">
          <img src={p.image} alt={p.name} />
          <h3>{p.name}</h3>
          <p>₹{p.price}</p>
        </div>
      ))}
    </div>
  );
}
