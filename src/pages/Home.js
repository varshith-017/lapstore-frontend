import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/products")
      .then((res) => setProducts(res.data || []))
      .catch((err) => console.log(err));
  }, []);

  const addToCart = async (productId) => {
    const userId = localStorage.getItem("userId");
    await API.post("/cart/add", { userId, productId });
    alert("Added to cart ✅");
  };

  return (
    <>
      <Navbar />

      <div className="hero">
        <h1>Welcome to SmartTech</h1>
        <p>Best laptops at best prices</p>
      </div>

      <div className="products">
        {products.map((p) => (
          <div
            className="card"
            key={p._id}
            onClick={() => navigate(`/product/${p._id}`)}
            style={{ cursor: "pointer" }}
          >
            <img src={p.image} alt={p.name} />
            <h3>{p.name}</h3>
            <p className="price">₹{p.price}</p>

            <button
              onClick={(e) => {
                e.stopPropagation();
                addToCart(p._id);
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </>
  );
}